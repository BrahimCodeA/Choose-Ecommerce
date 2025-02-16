import { useState } from "react";
import { ToastType, showToast } from "@/utils/toastUtils";
import useCart from "@/hooks/useCart";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const useProductActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const { addToCart } = useCart();

  const product = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const user = useSelector((state: RootState) => state.user.user);

  const toggleDescription = () => setIsOpen((prev) => !prev);
  const selectSize = (size: string) => setSelectedSize(size);

  const handleAddToCartClick = async () => {
    if (!user)
      return showToast(
        "Veuillez vous connecter pour ajouter au panier",
        ToastType.ERROR
      );

    if (!product) return showToast("Produit introuvable", ToastType.ERROR);
    if (!selectedSize)
      return showToast("Veuillez sélectionner une taille", ToastType.WARNING);

    try {
      await addToCart(user._id, product._id, 1);
    } catch (error) {
      showToast("Erreur lors de l'ajout au panier", ToastType.ERROR);
    }
  };

  return {
    user,
    product,
    isOpen,
    selectedSize,
    toggleDescription,
    selectSize,
    handleAddToCartClick,
  };
};

export default useProductActions;
