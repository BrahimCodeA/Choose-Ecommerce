import { Button } from "@/components/ui/Button";
import "./Cart.scss";
import useCart from "@/hooks/useCart";
import { CiTrash } from "react-icons/ci";

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
    return (
      <h2 className="cart__message">
        Veuillez vous connecter pour voir votre panier
      </h2>
    );
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
            <ul className="cart__list">
              {cart.map((item) => {
                const discountPrice = item.isDiscounted
                  ? item.price - (item.price * item.discountAmount) / 100
                  : item.price;

                return (
                  <li key={item.productId} className="cart__item">
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
                      <Button
                        className="cart__quantity-less"
                        onClick={() => updateQuantity(item.productId, -1)}
                        title="-"
                      />
                      <span>{item.quantity}</span>
                      <Button
                        className="cart__quantity-button-plus"
                        onClick={() => updateQuantity(item.productId, 1)}
                        title="+"
                      />
                    </div>
                    <Button
                      className="cart__remove"
                      onClick={() => removeItemFromCart(item.productId)}
                    >
                      <CiTrash />
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="cart__total">
            <p>Total: {totalPrice.toFixed(2)}€</p>
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
