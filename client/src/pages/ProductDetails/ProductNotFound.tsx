import ProductNotFound from "@/assets/404Product.png";

const ProdcutNotFound = () => {
  return (
    <div className="product-not-found">
      <p className="erreur-text">Aucun produit...</p>
      <img src={ProductNotFound} alt="404 produit non trouvé" />
    </div>
  );
};

export default ProdcutNotFound;
