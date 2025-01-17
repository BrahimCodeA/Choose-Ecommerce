import "./FilteredProducts.scss";
import { useProductList } from "@/hooks/useProductList";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "../Pagination/Pagination";
import { Card } from "../ui/Card";
import { FilteredProductsProps } from "@/types/filteredTypes";
import { Button } from "../ui/Button";
import { FilterProductMenu } from "../FilterProductMenu/FilterProductMenu";
import { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";

export const FilteredProducts = ({
  category,
  title,
}: FilteredProductsProps) => {
  const [openMenuFilter, setOpenMenuFilter] = useState(false);
  const products = useProductList();
  const filteredProducts =
    products?.filter((product) => product.category === category) || [];

  const { itemsToDisplay, page, totalPages, handlePageChange } = usePagination(
    filteredProducts,
    8
  );

  const handleMenuFilter = () => {
    setOpenMenuFilter(!openMenuFilter);
  };

  return (
    <>
      <div className={`filter-sidebar ${openMenuFilter ? "show" : ""}`}>
        <FilterProductMenu onClose={handleMenuFilter} />
      </div>
      <section className="filtered-products-container">
        <h2>{title || category}</h2>
        <Button className="filter-button" onClick={handleMenuFilter}>
          Filtres <BsFilterLeft />
        </Button>
        <div>
          {filteredProducts.length > 0 ? (
            itemsToDisplay.map((product) => (
              <div key={product._id}>
                <div className="filtered-products-image-wrapper">
                  <Card
                    image={product.image?.[0]}
                    title={product.name}
                    price={`${product.price}`}
                    discountPrice={product.discountPrice}
                    promo={product.promo}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>Aucun produit trouvé pour cette catégorie</p>
          )}
        </div>
      </section>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
