type ProductPriceProps = {
  product: {
    name: string;
    price: number;
    isDiscounted?: boolean;
    discountPrice?: string | null;
  };
};

const ProductPrice = ({ product }: ProductPriceProps) => {
  return (
    <>
      <h2 className="product-title">{product.name}</h2>
      <div className="product-price-info">
        <p
          className={`${
            product.isDiscounted ? "product-discounted" : "product-price"
          }`}
        >
          {product.price}€
        </p>
        {product.isDiscounted && product.discountPrice && (
          <p className="product-discounted-price">{product.discountPrice}€</p>
        )}
      </div>
    </>
  );
};

export default ProductPrice;
