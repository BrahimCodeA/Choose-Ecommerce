import loginImage from "@/assets/cart_notFound.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CartNotFound = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div>
      {!user && (
        <>
          <h2 className="cart__message">
            Veuillez vous connecter pour voir votre panier
          </h2>
          <img
            src={loginImage}
            alt="Veuillez vous connecter"
            className="cart__login-image"
          />
        </>
      )}
    </div>
  );
};

export default CartNotFound;
