import "./BestSellerSlider.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useProductList } from "@/hooks/useProductList";
import { sliderBestSellerSettings } from "@/config/sliderBestSellerSettings";

export const BestSellerSlider = () => {
  const products = useProductList();
  const bestsellers = products?.filter((product) => product.bestseller) || [];

  return (
    <section className="bestseller-slider">
      <h2>Les Meilleures Ventes</h2>
      <div className="slider-container">
        {bestsellers.length > 0 ? (
          <Slider {...sliderBestSellerSettings}>
            {bestsellers.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={product.image?.[0] || "/default-image.jpg"}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">À partir de {product.price}€</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="no-products">Aucun produit trouvé.</p>
        )}
      </div>
    </section>
  );
};
