import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { showToast } from "@/utils/toastUtils";
import { ToastType } from "@/utils/toastUtils";

type CartItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

const useCart = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        const response = await axios.get(`/api/cart/${user._id}`);
        setCart(response.data.cart);
      } catch (err) {
        setError("Erreur lors de la récupération du panier");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const removeItemFromCart = async (productId: string) => {
    if (!user) return;

    try {
      const response = await axios.delete(`/api/cart/remove`, {
        data: { userId: user._id, productId },
      });
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
      if (response.status === 200) {
        showToast("Produit supprimé du panier", ToastType.SUCCESS);
      } else {
        setError("Erreur lors de la suppression de l'élément");
        showToast(
          "Erreur lors de la suppression de l'élément",
          ToastType.ERROR
        );
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

    if (cartItem) {
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
            setCart((prevCart) =>
              prevCart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            );
            showToast("Quantité mise à jour", ToastType.SUCCESS);
          } else {
            showToast(
              "Erreur lors de la mise à jour de la quantité",
              ToastType.ERROR
            );
          }
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la quantité:", error);
          showToast(
            "Erreur lors de la mise à jour de la quantité",
            ToastType.ERROR
          );
        }
      } else {
        showToast(
          "La quantité ne peut pas être inférieure à 1",
          ToastType.ERROR
        );
      }
    }

    setTimeout(() => setIsUpdating(false), 1000);
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const response = await axios.delete(`/api/cart/clear`, {
        data: { userId: user._id },
      });
      if (response.status === 200) {
        setCart([]);
        showToast("Panier vidé avec succès", ToastType.SUCCESS);
      } else {
        setError("Erreur lors de la suppression du panier");
        showToast("Erreur lors de la suppression du panier", ToastType.ERROR);
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du panier:", err);
      setError("Erreur lors de la suppression du panier");
      showToast("Erreur lors de la suppression du panier", ToastType.ERROR);
    }
  };

  const calculateTotalPrice = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalPrice = calculateTotalPrice(cart);

  return {
    cart,
    loading,
    error,
    user,
    removeItemFromCart,
    updateQuantity,
    clearCart,
  };
};

export default useCart;
