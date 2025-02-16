import { useState } from "react";

type ProductImageProps = {
  product: {
    image: string[];
    name: string;
  };
};

const ProductImage = ({ product }: ProductImageProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
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

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Agrandissement"
            className="lightbox-image"
          />
        </div>
      )}
    </>
  );
};

export default ProductImage;
