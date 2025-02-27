import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CartNotFound = () => {
  const user = useSelector((state: RootState) => state.users.user);
  return (
    <div>
      {!user && (
        <>
          <h2 className="cart__message">
            Veuillez vous connecter pour voir votre panier
          </h2>
          <img
            src="/assets/cart_notFound.webp"
            alt="Veuillez vous connecter"
            className="cart__login-image"
          />
        </>
      )}
    </div>
  );
};

export default CartNotFound;
