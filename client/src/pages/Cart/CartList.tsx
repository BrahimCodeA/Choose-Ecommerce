import CartItem from "./CartItem";
import { CartListProps } from "@/types/cartTypes";

const CartList = ({
  cart,
  updateQuantity,
  removeItemFromCart,
}: CartListProps) => (
  <ul className="cart__list">
    {cart.map((item) => (
      <CartItem
        key={item.productId}
        item={item}
        updateQuantity={updateQuantity}
        removeItemFromCart={removeItemFromCart}
      />
    ))}
  </ul>
);

export default CartList;
