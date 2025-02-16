import { deleteProduct } from "@/redux/slices/productsSlice";
import { ToastType, showToast } from "@/utils/toastUtils";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useRemoveProduct = () => {
  const dispatch = useDispatch();

  const removeProduct = async (id: string) => {
    try {
      await axios.delete(`/api/product/remove/${id}`);
      dispatch(deleteProduct(id));
      showToast("Produit supprimé", ToastType.SUCCESS);
    } catch (error) {
      console.log(error);
      showToast("Erreur lors de la suppression", ToastType.ERROR);
    }
  };

  return { removeProduct };
};
