import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedProduct } from "@/redux/slices/productsSlice";

const useSingleProduct = (id: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/single/${id}`);
        dispatch(setSelectedProduct(res.data.product));
      } catch (error) {
        console.log(error);
        dispatch(setSelectedProduct(null));
      }
    };

    if (id) fetchProduct();
  }, [dispatch, id]);
};

export default useSingleProduct;
