import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const product = await Product.findById(productId).select(
      "price name image isDiscounted discountAmount"
    );
    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });

    const discountedPrice = product.isDiscounted
      ? product.price - (product.price * product.discountAmount) / 100
      : product.price;

    const existingCartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({
        productId,
        quantity,
        price: discountedPrice,
        originalPrice: product.price,
        name: product.name,
        image: product.image[0],
        isDiscounted: product.isDiscounted,
        discountAmount: product.discountAmount,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Produit ajouté au panier", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout au panier" });
  }
};

export const updateCartItem = async (req, res) => {
  const { userId, productId, change } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const cartItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Produit non trouvé dans le panier" });
    }

    if (change === 1) {
      cartItem.quantity += 1;
    } else if (change === -1 && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      return res.status(400).json({ message: "Quantité minimale atteinte" });
    }

    await user.save();

    res.status(200).json({ message: "Quantité mise à jour", cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res
      .status(200)
      .json({ message: "Produit supprimé du panier", cart: user.cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du produit" });
  }
};

export const clearCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.cart = [];

    await user.save();

    res.status(200).json({ message: "Panier vidé", cart: user.cart });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du panier" });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const totalPrice = user.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    res.status(200).json({ cart: user.cart, totalPrice });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du panier" });
  }
};
