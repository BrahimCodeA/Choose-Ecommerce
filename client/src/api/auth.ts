import axios from "axios";

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/refresh-token`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors du rafraîchissement du token", error);
    throw error;
  }
};
