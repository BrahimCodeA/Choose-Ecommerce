import "./Cart.scss";
import { Button } from "@/components/ui/Button";
import CartNotFound from "./CartNotFound";
import useCart from "@/hooks/useCart";
import CartList from "./CartList";
import usePayment from "@/hooks/usePayment";

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
  const { isSubmitting, makePayment } = usePayment();

  if (!user) return <CartNotFound />;

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
          <div className="cart__total">
            <p>Total: {totalPrice.toFixed(2)}€</p>
          </div>
          <Button
            className="cart__checkout-button"
            onClick={makePayment}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Chargement..." : "Passer commande"}
          </Button>

          <Button
            className="cart__clear-button"
            onClick={clearCart}
            disabled={isSubmitting}
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
