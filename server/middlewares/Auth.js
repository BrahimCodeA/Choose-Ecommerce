import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { redis } from "../config/redis.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};

export const protectRoute = async (req, res, next) => {
  try {
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé - Aucun token fourni" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }

      req.user = user;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError" && refreshToken) {
        try {
          const decodedRefresh = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
          );
          const storedToken = await redis.get(
            `refresh_token:${decodedRefresh.userId}`
          );

          if (storedToken !== refreshToken) {
            return res
              .status(401)
              .json({ message: "Token de rafraîchissement invalide" });
          }

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            generateTokens(decodedRefresh.userId);
          await storeRefreshToken(decodedRefresh.userId, newRefreshToken);

          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
          });

          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          const user = await User.findById(decodedRefresh.userId).select(
            "-password"
          );
          req.user = user;
          return next();
        } catch (refreshError) {
          return res
            .status(401)
            .json({ message: "Token de rafraîchissement expiré ou invalide" });
        }
      }
      return res
        .status(401)
        .json({ message: "Token d'accès invalide ou expiré" });
    }
  } catch (error) {
    console.error("Erreur dans le middleware protectRoute", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Accès refusé - Réservé aux administrateurs" });
  }
};
