import "./Pagination.scss";
import { Button } from "../ui/Button";
import React from "react";
import { ImPrevious2 } from "react-icons/im";
import { ImNext2 } from "react-icons/im";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="prev-button"
      >
        <ImPrevious2 /> Précédent
      </Button>
      <span>
        Page {page} sur {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="next-button"
      >
        Suivant <ImNext2 />
      </Button>
    </div>
  );
};

export default Pagination;
