import axios from "axios";

export const useAddToCart = () => {
  const addToCart = async (
    userId: string,
    productId: string,
    quantity: number
  ): Promise<void> => {
    try {
      const response = await axios.post("/api/cart/add", {
        userId,
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      throw error;
    }
  };

  return { addToCart };
};
