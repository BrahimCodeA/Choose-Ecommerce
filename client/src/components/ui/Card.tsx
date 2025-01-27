import "@/style/Card.scss";
import { MdDiscount } from "react-icons/md";
import { Link } from "react-router-dom";

type CardProps = {
  id: string;
  image: string;
  title: string;
  price: number | string;
  discountPrice?: string | null;
  promo?: boolean;
};

export const Card = ({
  id,
  image,
  title,
  price,
  discountPrice,
  promo,
}: CardProps) => {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className="card-image" />
        {promo && (
          <span className="promo-label">
            En promo <MdDiscount />
          </span>
        )}
        <h3 className="card-name">{title}</h3>
        <div className="card-price">
          <span
            className={`original-price ${discountPrice ? "has-promo" : ""}`}
          >
            {price}€
          </span>
          {discountPrice && (
            <span className="discount-price">{discountPrice}€</span>
          )}
        </div>
      </Link>
    </div>
  );
};
