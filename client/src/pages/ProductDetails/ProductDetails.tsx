import "./ProductDetails.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSingleProduct from "@/hooks/useProductDetails";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ToastType, showToast } from "@/utils/toastUtils";
import useCart from "@/hooks/useCart";

const ProductDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("");

  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  useSingleProduct(id);

  const product = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const user = useSelector((state: RootState) => state.user.user);
  const { addToCart } = useCart();

  if (!product) return <p className="erreur-text">Aucun produit...</p>;

  const handleOpen = () => setIsOpen(!isOpen);
  const handleAddToCartClick = async () => {
    if (!user) {
      showToast(
        "Veuillez vous connecter pour ajouter au panier",
        ToastType.ERROR
      );
      return;
    }

    if (!selectedSize) {
      showToast("Veuillez sélectionner une taille", ToastType.WARNING);
      return;
    }

    try {
      await addToCart(user._id, product._id, 1);
    } catch (error) {
      showToast("Erreur lors de l'ajout au panier", ToastType.ERROR);
    }
  };

  return (
    <section className="single-product-container">
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
            <span
              key={index}
              className={`product-size ${
                selectedSize === String(size) ? "selected" : ""
              }`}
              onClick={() => setSelectedSize(String(size))}
            >
              {size}
            </span>
          ))}
        </div>

        <Button
          onClick={handleOpen}
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

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Agrandissement"
            className="lightbox-image"
          />
        </div>
      )}
    </section>
  );
};

export default ProductDetails;
