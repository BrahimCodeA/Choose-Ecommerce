import { Button } from "@/components/ui/Button";
import "./Cart.scss";
import useCart from "@/hooks/useCart";

const Cart = () => {
  const {
    cart,
    loading,
    error,
    user,
    removeItemFromCart,
    clearCart,
    updateQuantity,
  } = useCart();

  if (!user)
    return (
      <h2 className="cart__message">
        Veuillez vous connecter pour voir votre panier
      </h2>
    );

  return (
    <section className="cart">
      <h3>Chooser</h3>
      <h4>Votre Panier</h4>

      {loading ? (
        <p className="cart__message">Chargement...</p>
      ) : error ? (
        <p className="cart__message">{error}</p>
      ) : cart.length > 0 ? (
        <>
          <ul className="cart__list">
            {cart.map((item) => (
              <li key={item.productId} className="cart__item">
                <img src={item.image} alt={item.name} className="cart__image" />
                <p className="cart__name">{item.name}</p>
                <div className="cart__details">
                  <p>Prix: {item.price}€</p>
                  <div className="cart__quantity">
                    <Button
                      className="cart__quantity-button"
                      onClick={() => updateQuantity(item.productId, -1)}
                      title="-"
                    />
                    <span>Quantité: {item.quantity}</span>
                    <Button
                      className="cart__quantity-button"
                      onClick={() => updateQuantity(item.productId, 1)}
                      title="+"
                    />
                  </div>
                </div>
                <Button
                  className="cart__remove-button"
                  onClick={() => removeItemFromCart(item.productId)}
                  title="Supprimer"
                />
              </li>
            ))}
          </ul>
          <div className="cart__total">
            <p>
              Total:{" "}
              {cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
              €
            </p>
          </div>
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
