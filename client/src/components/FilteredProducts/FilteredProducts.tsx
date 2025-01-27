import "./FilteredProducts.scss";
import Pagination from "../Pagination/Pagination";
import { Card } from "../ui/Card";
import { FilteredProductsProps } from "@/types/filteredTypes";
import { Button } from "../ui/Button";
import { FilterProductMenu } from "../FilterProductMenu/FilterProductMenu";
import { BsFilterLeft } from "react-icons/bs";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { useState } from "react";

export const FilteredProducts = ({
  category,
  title,
}: FilteredProductsProps) => {
  const [openMenuFilter, setOpenMenuFilter] = useState(false);

  const {
    itemsToDisplay,
    page,
    totalPages,
    handlePageChange,
    setIsPromoFilterActive,
    setSearchQuery,
    setSortOrder,
  } = useFilteredProducts(category);

  const handleMenuFilter = () => setOpenMenuFilter(!openMenuFilter);

  return (
    <>
      <div className={`filter-sidebar ${openMenuFilter ? "show" : ""}`}>
        <FilterProductMenu
          onClose={handleMenuFilter}
          onPromoFilterChange={setIsPromoFilterActive}
          onSearchChange={setSearchQuery}
          onSortChange={setSortOrder}
        />
      </div>
      <section className="filtered-products-container">
        <h2>{title || category}</h2>
        <Button className="filter-button" onClick={handleMenuFilter}>
          Filtres <BsFilterLeft />
        </Button>
        <div>
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((product) => (
              <div key={product._id}>
                <div className="filtered-products-image-wrapper">
                  <Card
                    id={product._id}
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
