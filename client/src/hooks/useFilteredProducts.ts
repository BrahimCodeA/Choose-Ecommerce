import { useState, useMemo } from "react";
import { useProductList } from "@/hooks/useProductList";
import { usePagination } from "@/hooks/usePagination";

export const useFilteredProducts = (category: string) => {
  const [isPromoFilterActive, setIsPromoFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const products = useProductList();

  const filteredProducts = useMemo(() => {
    return (
      products?.filter((product) => {
        return (
          product.category === category &&
          (!isPromoFilterActive || product.promo) &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }) || []
    );
  }, [products, category, isPromoFilterActive, searchQuery]);

  const { itemsToDisplay, page, totalPages, handlePageChange } = usePagination(
    filteredProducts,
    8
  );

  return {
    filteredProducts,
    itemsToDisplay,
    page,
    totalPages,
    handlePageChange,
    setIsPromoFilterActive,
    setSearchQuery,
  };
};
