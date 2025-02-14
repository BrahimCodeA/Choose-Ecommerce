const CartTotal = ({ totalPrice }: { totalPrice: number }) => (
  <div className="cart__total">
    <p>Total: {totalPrice.toFixed(2)}€</p>
  </div>
);

export default CartTotal;
