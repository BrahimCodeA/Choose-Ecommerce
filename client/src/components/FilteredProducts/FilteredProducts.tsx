import "./FilteredProducts.scss";
import { useProductList } from "@/hooks/useProductList";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "../Pagination/Pagination";

type FilteredProductsProps = {
  category: string;
  title?: string;
};

export const FilteredProducts = ({
  category,
  title,
}: FilteredProductsProps) => {
  const products = useProductList();
  const filteredProducts =
    products?.filter((product) => product.category === category) || [];

  const { itemsToDisplay, page, totalPages, handlePageChange } = usePagination(
    filteredProducts,
    8
  );

  return (
    <section className="filtered-products-container">
      <h2>{title || category}</h2>
      <div>
        {filteredProducts.length > 0 ? (
          itemsToDisplay.map((product) => (
            <div key={product._id}>
              <div className="filtered-products-image-wrapper">
                <img
                  src={product.image?.[0] || "/default-image.jpg"}
                  alt={product.name}
                  className="filtered-products-image"
                />
              </div>
              <h3>{product.name}</h3>
              <p>{product.price}€</p>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé pour cette catégorie</p>
        )}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
