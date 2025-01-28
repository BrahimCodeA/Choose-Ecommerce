import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { calculateDiscountedProduct } from "@/constants/calculateDiscountedProduct";
import { Product } from "@/types/productType";

type ProductState = {
  products: Product[];
  selectedProduct: Product | null;
  page: number;
  pageSize: number;
};

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  page: 1,
  pageSize: 8,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(calculateDiscountedProduct(action.payload));
    },

    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload.map(calculateDiscountedProduct);
    },

    setSelectedProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload
        ? calculateDiscountedProduct(action.payload)
        : null;
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },

    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  setProducts,
  setSelectedProduct,
  setPage,
  setPageSize,
} = productSlice.actions;
export default productSlice.reducer;
