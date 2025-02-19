import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import useSingleProduct from "@/hooks/useProductDetails";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import useProductActions from "@/hooks/useProductActions";
import { Button } from "@/components/ui/Button";
import NotFound from "../NotFound/NotFound";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  useSingleProduct(id);

  const {
    product,
    isOpen,
    toggleDescription,
    handleAddToCartClick,
    selectedSize,
    selectSize,
  } = useProductActions();

  if (!product) return <NotFound />;

  return (
    <section className="single-product-container">
      <ProductImage product={product} />
      <div className="product-details">
        <ProductPrice product={product} />

        <p>- Choisissez une taille -</p>
        <div className="product-sizes">
          {product.sizes.map((size, index) => (
            <span
              key={index}
              className={`product-size ${
                selectedSize === String(size) ? "selected" : ""
              }`}
              onClick={() => selectSize(String(size))}
            >
              {size}
            </span>
          ))}
        </div>

        <Button
          onClick={toggleDescription}
          className="product-button-description"
          title={isOpen ? "Cacher la description" : "Voir la description"}
        />
        <Button
          className="cart-link"
          title="Ajouter au panier"
          onClick={handleAddToCartClick}
        />

        {isOpen && <p className="product-description">{product.description}</p>}
      </div>
    </section>
  );
};

export default ProductDetails;
