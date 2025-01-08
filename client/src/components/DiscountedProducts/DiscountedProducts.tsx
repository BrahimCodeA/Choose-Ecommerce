import "./DiscountedProducts.scss";
import { MdDiscount } from "react-icons/md";
import { useProductList } from "@/hooks/useProductList";

export const DiscountedProducts = () => {
  const products = useProductList();
  const discountedProducts =
    products?.filter((product) => product.discountAmount > 0) || [];

  return (
    <section className="isDiscounted-container">
      <h2>Les promotions</h2>
      <div>
        {discountedProducts.length > 0 ? (
          discountedProducts.map((product) => (
            <div key={product._id}>
              <div className="isDiscounted-image-wrapper">
                <img
                  src={product.image?.[0] || "/default-image.jpg"}
                  alt={product.name}
                  className="isDiscounted-image"
                />
                <span className="promo-label">
                  En promo <MdDiscount />
                </span>
              </div>
              <h3>{product.name}</h3>
              <p>
                <span className="original-price">{product.price}€</span>{" "}
                <span className="discounted-price">
                  {(product.price * (1 - product.discountAmount / 100)).toFixed(
                    2
                  )}
                  €
                </span>
              </p>
            </div>
          ))
        ) : (
          <p>Aucun produit actuellement en promotion</p>
        )}
      </div>
    </section>
  );
};
