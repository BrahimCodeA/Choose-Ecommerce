import { Product } from "@/types/productType";

export const calculateDiscountedProduct = (product: Product) => ({
  ...product,
  discountPrice: product.discountAmount
    ? (product.price * (1 - product.discountAmount / 100)).toFixed(2)
    : null,
  promo: product.discountAmount > 0,
});
