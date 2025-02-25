import { setProducts } from "@/redux/slices/productsSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useProductList = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/product/list");
        dispatch(setProducts(res.data.products));
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    if (!products?.length) fetchProducts();
  }, [dispatch, products]);

  return products;
};
