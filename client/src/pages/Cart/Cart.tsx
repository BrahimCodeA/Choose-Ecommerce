import { Button } from "@/components/ui/Button";
import "./Cart.scss";
import useCart from "@/hooks/useCart";
import CartList from "./CartList";
import CartTotal from "./CartTotal";
import CartNotFound from "./CartNotFound";

const Cart = () => {
  const {
    cart,
    loading,
    error,
    user,
    removeItemFromCart,
    clearCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  if (!user) {
    return <CartNotFound />;
  }

  return (
    <section className="cart">
      <h2>Votre Panier</h2>
      {loading ? (
        <p className="cart__message">Chargement...</p>
      ) : error ? (
        <p className="cart__message">{error}</p>
      ) : cart.length > 0 ? (
        <>
          <div className="cart__list-container">
            <CartList
              cart={cart}
              updateQuantity={updateQuantity}
              removeItemFromCart={removeItemFromCart}
            />
          </div>
          <CartTotal totalPrice={totalPrice} />
          <Button
            className="cart__clear-button"
            onClick={clearCart}
            title="Vider le panier"
          />
        </>
      ) : (
        <p className="cart__message">Le panier est vide.</p>
      )}
    </section>
  );
};

export default Cart;
