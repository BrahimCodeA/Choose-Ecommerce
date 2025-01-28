export type Product = {
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
  discountPrice?: string | null;
  promo?: boolean;
};
