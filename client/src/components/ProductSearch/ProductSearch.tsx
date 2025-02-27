import "./ProductSearch.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom";

type ProductSearchProps = {
  searchQuery: string;
  onCloseSearch: () => void;
};

export const ProductSearch = ({
  searchQuery,
  onCloseSearch,
}: ProductSearchProps) => {
  const products = useSelector((state: RootState) => state.products.products);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredProducts.length > 0 && searchQuery ? (
        <div className="filtered-product">
          <Link
            to={`/product/${filteredProducts[0]._id}`}
            onClick={onCloseSearch}
          >
            <h3>{filteredProducts[0].name}</h3>
            <img
              src={filteredProducts[0].image[0]}
              alt={filteredProducts[0].name}
            />
          </Link>
        </div>
      ) : (
        searchQuery && (
          <p className="no-products-search">Aucun produit trouvé.</p>
        )
      )}
    </div>
  );
};
