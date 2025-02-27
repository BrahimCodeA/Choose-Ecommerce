import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { showToast, ToastType } from "@/utils/toastUtils";
import {
  setCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/redux/slices/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const cart = useSelector((state: RootState) => state.carts.cart);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const response = await axios.get(`/api/cart/${user._id}`);
        dispatch(setCart(response.data.cart));
      } catch (err: any) {
        setError(`Erreur lors de la récupération du panier: ${err.message}`);
        console.error("Erreur lors de la récupération du panier:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, dispatch]);

  const addToCart = async (
    userId: string,
    productId: string,
    quantity: number
  ): Promise<void> => {
    if (!user) return;

    try {
      const response = await axios.post("/api/cart/add", {
        userId,
        productId,
        quantity,
      });

      dispatch(setCart([...cart, response.data]));
      showToast("Produit ajouté au panier !", ToastType.SUCCESS);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      showToast("Erreur lors de l'ajout au panier", ToastType.ERROR);
    }
  };

  const removeItemFromCart = async (productId: string) => {
    if (!user) return;

    try {
      const response = await axios.delete(`/api/cart/remove`, {
        data: { userId: user._id, productId },
      });

      if (response.status === 200) {
        dispatch(removeFromCart(productId));
        showToast("Produit supprimé du panier", ToastType.SUCCESS);
      } else {
        throw new Error("Erreur lors de la suppression de l'élément");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'élément:", error);
      setError("Erreur lors de la suppression de l'élément");
      showToast("Erreur lors de la suppression de l'élément", ToastType.ERROR);
    }
  };

  const updateQuantity = async (productId: string, change: number) => {
    if (!user || isUpdating) return;
    setIsUpdating(true);

    const cartItem = cart.find((item) => item.productId === productId);
    if (!cartItem) return;

    const newQuantity = cartItem.quantity + change;

    if (newQuantity >= 1) {
      try {
        const response = await axios.put(`/api/cart/update`, {
          userId: user._id,
          productId,
          quantity: newQuantity,
          change,
        });

        if (response.status === 200) {
          dispatch(updateCartItemQuantity({ productId, change }));
          showToast("Quantité mise à jour", ToastType.SUCCESS);
        } else {
          throw new Error("Erreur lors de la mise à jour de la quantité");
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la quantité:", error);
        showToast(
          "Erreur lors de la mise à jour de la quantité",
          ToastType.ERROR
        );
      }
    } else {
      showToast("La quantité ne peut pas être inférieure à 1", ToastType.ERROR);
    }

    setTimeout(() => setIsUpdating(false), 1000);
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const response = await axios.delete(`/api/cart/clear`, {
        data: { userId: user._id },
      });
      if (!response) {
        console.log("Erreur lors de la suppression du panier");
      }
      dispatch(setCart([]));
    } catch (err) {
      console.error("Erreur lors de la suppression du panier:", err);
      setError("Erreur lors de la suppression du panier");
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.isDiscounted
        ? item.price - (item.price * item.discountAmount) / 100
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  return {
    cart,
    loading,
    error,
    user,
    addToCart,
    removeItemFromCart,
    updateQuantity,
    clearCart,
    totalPrice: calculateTotalPrice(),
  };
};

export default useCart;
