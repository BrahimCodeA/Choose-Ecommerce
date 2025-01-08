import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: boolean;
  category: string;
  brand: string;
  sizes: number[];
  bestseller: boolean;
  isDiscounted: boolean;
  discountAmount: number;
  image: string[];
};

type ProductState = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
};

const initialState: ProductState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 8,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },

    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    setPagination(
      state,
      action: PayloadAction<{ currentPage: number; totalPages: number }>
    ) {
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },

    setItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  setProducts,
  setPagination,
  setItemsPerPage,
} = productSlice.actions;
export default productSlice.reducer;
