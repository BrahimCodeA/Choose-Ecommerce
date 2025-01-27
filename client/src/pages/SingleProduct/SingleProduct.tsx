import "./SingleProduct.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useSingleProduct from "@/hooks/useSingleProduct";

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  useSingleProduct(id!);

  const product = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  if (!product)
    return <p className="loading-text">Loading product details...</p>;

  return (
    <div className="single-product-container">
      <div className="product-image-container">
        <img
          src={product.image[0]}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="product-price-info">
          <p className="product-price">€{product.price}</p>
          {product.isDiscounted && (
            <p className="product-discounted-price">
              Now: €{product.discountPrice}
            </p>
          )}
        </div>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-brand">Brand: {product.brand}</p>
        <p className="product-sizes">
          Available Sizes: {product.sizes.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
