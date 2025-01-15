import "./DiscountedProducts.scss";
import { MdDiscount } from "react-icons/md";
import { useProductList } from "@/hooks/useProductList";
import { usePagination } from "@/hooks/usePagination";
import Pagination from "../Pagination/Pagination";
import { Card } from "../ui/Card";

export const DiscountedProducts = () => {
  const products = useProductList();
  const discountedProducts =
    products?.filter((product) => product.discountAmount) || [];

  const { itemsToDisplay, page, totalPages, handlePageChange } = usePagination(
    discountedProducts,
    8
  );

  return (
    <>
      <section className="isDiscounted-container">
        <h2>Les Promotions</h2>
        <div>
          {discountedProducts.length > 0 ? (
            itemsToDisplay.map((product) => {
              const discountPrice = product.discountAmount
                ? (product.price * (1 - product.discountAmount / 100)).toFixed(
                    2
                  )
                : undefined;

              return (
                <Card
                  key={product._id}
                  image={product.image?.[0]}
                  title={product.name}
                  price={`${product.price}€`}
                  discountPrice={
                    discountPrice ? `${discountPrice}€` : undefined
                  }
                  promo={
                    <span>
                      En promo <MdDiscount />
                    </span>
                  }
                />
              );
            })
          ) : (
            <p>Aucun produit actuellement en promotion</p>
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
