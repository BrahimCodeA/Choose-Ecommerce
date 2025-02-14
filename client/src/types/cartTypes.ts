export interface CartItemProps {
  item: {
    productId: string;
    name: string;
    price: number;
    isDiscounted: boolean;
    discountAmount: number;
    image: string;
    quantity: number;
  };
  updateQuantity: (productId: string, amount: number) => void;
  removeItemFromCart: (productId: string) => void;
}

export interface CartListProps {
  cart: CartItemProps["item"][];
  updateQuantity: (productId: string, amount: number) => void;
  removeItemFromCart: (productId: string) => void;
}
