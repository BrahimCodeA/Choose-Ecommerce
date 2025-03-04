import { useProductList } from "@/hooks/useProductList";
import { Card } from "../ui/Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sliderBestSellerSettings } from "@/config/sliderBestSellerSettings";
import "./BestSellerSlider.scss";

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
              <div key={product._id}>
                <Card
                  id={product._id}
                  image={product.image?.[0]}
                  title={product.name}
                  price={`${product.price}`}
                  discountPrice={product.discountPrice}
                  promo={product.promo}
                />
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
