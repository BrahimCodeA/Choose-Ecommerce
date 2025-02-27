import { useDispatch, useSelector } from "react-redux";
import { setPage } from "@/redux/slices/productsSlice";
import { useMemo } from "react";
import { RootState } from "@/redux/store";

export const usePagination = <T>(items: T[], pageSize: number) => {
  const dispatch = useDispatch();
  const { page } = useSelector((state: RootState) => state.products);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const itemsToDisplay = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };
  const totalPages = Math.ceil(items.length / pageSize);

  return {
    itemsToDisplay,
    page,
    totalPages,
    handlePageChange,
  };
};
