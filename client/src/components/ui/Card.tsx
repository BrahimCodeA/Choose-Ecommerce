import "@/style/Card.scss";

type CardProps = {
  image: string;
  title: string;
  price: number | string;
  discountPrice?: string;
  promo?: string | JSX.Element;
};

export const Card = ({
  image,
  title,
  price,
  discountPrice,
  promo,
}: CardProps) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="card-image" />
      {promo && <span className="promo-label">{promo}</span>}
      <h3 className="card-name">{title}</h3>
      <div className="card-price">
        <span className={`original-price ${discountPrice ? "has-promo" : ""}`}>
          {price}
        </span>
        {discountPrice && (
          <span className="discount-price">{discountPrice}</span>
        )}
      </div>
    </div>
  );
};