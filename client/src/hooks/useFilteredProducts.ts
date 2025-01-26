import { useState, useMemo } from "react";
import { useProductList } from "@/hooks/useProductList";
import { usePagination } from "@/hooks/usePagination";

export const useFilteredProducts = (category: string) => {
  const [isPromoFilterActive, setIsPromoFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"Croissant" | "Décroissant" | "">(
    ""
  );

  const products = useProductList();

  const filteredProducts = useMemo(() => {
    const filtered =
      products?.filter((product) => {
        return (
          product.category === category &&
          (!isPromoFilterActive || product.promo) &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }) || [];

    if (sortOrder === "Croissant") {
      return filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Décroissant") {
      return filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, category, isPromoFilterActive, searchQuery, sortOrder]);

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
    setSortOrder,
  };
};
