import "./ListProduct.scss";
import { Button } from "@/components/ui/Button";
import { RiChatDeleteFill } from "react-icons/ri";
import { useProductList } from "@/hooks/useProductList";
import { useProductActions } from "@/hooks/useProductActions";
import Pagination from "@/components/Pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";

export default function ListProduct() {
  const products = useProductList();
  const { removeProduct } = useProductActions();
  const { itemsToDisplay, page, totalPages, handlePageChange } = usePagination(
    products,
    8
  );

  return (
    <>
      <div className="product-list">
        <h2>Liste des produits</h2>
        <h5>Nombre de produits: {products.length}</h5>
        {products.length > 0 ? (
          <table className="product-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Images</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemsToDisplay.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td className="product-image">
                    {Array.isArray(product.image) &&
                      product.image.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${product.name} image ${index + 1}`}
                          className="product-thumbnail"
                        />
                      ))}
                  </td>
                  <td className="actions-delete">
                    <Button
                      className="delete-button"
                      onClick={() => removeProduct(product._id)}
                      icon={<RiChatDeleteFill />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-products">Aucun produit disponible</p>
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
