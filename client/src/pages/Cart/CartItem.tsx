import { Button } from "@/components/ui/Button";
import { CiTrash } from "react-icons/ci";
import { CartItemProps } from "@/types/cartTypes";

const CartItem = ({
  item,
  updateQuantity,
  removeItemFromCart,
}: CartItemProps) => {
  const discountPrice = item.isDiscounted
    ? item.price - (item.price * item.discountAmount) / 100
    : item.price;

  return (
    <li className="cart__item">
      <figure className="cart__image">
        <img src={item.image} alt={item.name} />
      </figure>
      <p className="cart__name">{item.name}</p>
      <span className="cart__price">
        {item.isDiscounted ? (
          <>
            <span className="cart__old-price">{item.price}€</span>
            <span className="cart__discount-price">
              {discountPrice.toFixed(2)}€
            </span>
          </>
        ) : (
          <span>{item.price}€</span>
        )}
      </span>
      <div className="cart__quantity">
        <Button onClick={() => updateQuantity(item.productId, -1)} title="-" />
        <span>{item.quantity}</span>
        <Button onClick={() => updateQuantity(item.productId, 1)} title="+" />
      </div>
      <Button
        className="cart__remove"
        onClick={() => removeItemFromCart(item.productId)}
      >
        <CiTrash />
      </Button>
    </li>
  );
};

export default CartItem;
