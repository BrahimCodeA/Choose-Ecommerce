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
  page: number;
  pageSize: number;
};

const initialState: ProductState = {
  products: [],
  page: 1,
  pageSize: 8,
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
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
  },
});

export const { addProduct, deleteProduct, setProducts, setPage, setPageSize } =
  productSlice.actions;
export default productSlice.reducer;
