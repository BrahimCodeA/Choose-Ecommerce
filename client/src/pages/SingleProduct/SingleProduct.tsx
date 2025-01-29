import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSingleProduct from "@/hooks/useSingleProduct";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const SingleProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  useSingleProduct(id);

  const product = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  if (!product) return <p className="loading-text">Chargement du produit...</p>;

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="single-product-container">
      <div className="product-image-container">
        <img
          src={selectedImage || product.image[0]}
          alt={product.name}
          className="product-image"
          onClick={() =>
            setSelectedImage(selectedImage ? null : product.image[0])
          }
        />
      </div>

      <div className="product-thumbnails">
        {product.image.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniature ${index + 1}`}
            className={`thumbnail ${selectedImage === img ? "active" : ""}`}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <div className="product-details">
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

        <p>- Choisissez une taille -</p>
        <div className="product-sizes">
          {product.sizes.map((size, index) => (
            <span key={index} className="product-size">
              {size}
            </span>
          ))}
        </div>

        <Button
          onClick={handleOpen}
          className="product-button-description"
          title={isOpen ? "Cacher la description" : "Voir la description"}
        />
        <Button className="cart-link" title="Ajouter au panier" />

        {isOpen && <p className="product-description">{product.description}</p>}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Agrandissement"
            className="lightbox-image"
          />
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
