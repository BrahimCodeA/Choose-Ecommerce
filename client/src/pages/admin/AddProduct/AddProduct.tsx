import "./AddProduct.scss";
import { useAddProduct } from "@/hooks/useAddProduct";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { FiUploadCloud } from "react-icons/fi";
import { sizesOptions } from "@/constants/sizesOptions";

export default function AddProduct() {
  const {
    isSubmitting,
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    stock,
    setStock,
    category,
    setCategory,
    brand,
    setBrand,
    sizes,
    handleAddSize,
    handleRomveAllSizes,
    handleRemoveSize,
    bestseller,
    setBestseller,
    isDiscounted,
    setIsDiscounted,
    discountAmount,
    handleDiscountChange,
    image1,
    setImage1,
    image2,
    setImage2,
    onSubmitHandler,
  } = useAddProduct();

  return (
    <div className="product-form">
      <form onSubmit={onSubmitHandler}>
        <Input
          type="text"
          value={name}
          placeholder="Nom du produit"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="number"
          value={price}
          placeholder="Prix"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <TextArea
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Label title="Meilleurs ventes" className="checkbox-product" />
        <Checkbox
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <Label title="En stock" className="checkbox-product" />
        <Checkbox
          checked={stock}
          onChange={(e) => setStock(e.target.checked)}
        />
        <Label title="Activer une remise" className="checkbox-product" />
        <Checkbox
          checked={isDiscounted}
          onChange={(e) => setIsDiscounted(e.target.checked)}
        />
        <Input
          type="number"
          value={discountAmount}
          placeholder="Montant de la remise"
          onChange={handleDiscountChange}
          disabled={!isDiscounted}
        />
        <Input
          type="text"
          value={brand}
          placeholder="Marque"
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <Select
          placeholder="Catégorie"
          value={category}
          options={[
            { value: "Homme", label: "Homme" },
            { value: "Femme", label: "Femme" },
            { value: "Enfant", label: "Enfant" },
          ]}
          onChange={(e) => setCategory(e.target.value)}
          className="custom-select"
        />
        <Select
          placeholder="Tailles disponibles"
          value={sizes.length === 0 ? "" : sizes[sizes.length - 1]}
          options={sizesOptions}
          onChange={(e) => handleAddSize(Number(e.target.value))}
          className="custom-select"
        />
        {sizes.length > 0 && (
          <div className="selected-sizes">
            <h4>Tailles sélectionnées</h4>
            <Button
              type="button"
              onClick={handleRomveAllSizes}
              className="remove-all-sizes-button"
            >
              Tout supprimer
            </Button>
            <ul>
              {sizes.map((size) => (
                <li key={size}>
                  {size}{" "}
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="remove-size-button"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-images">
          {/* Upload de la première image */}
          <label className="form-image-upload">
            {image1 ? (
              <img
                src={URL.createObjectURL(image1)}
                alt="Prévisualisation de l'image 1"
                className="form-image-preview"
              />
            ) : (
              <FiUploadCloud size={50} color="#888" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImage1(e.target.files[0])}
              hidden
            />
          </label>

          {/* Upload de la deuxième image */}
          <label className="form-image-upload">
            {image2 ? (
              <img
                src={URL.createObjectURL(image2)}
                alt="Prévisualisation de l'image 2"
                className="form-image-preview"
              />
            ) : (
              <FiUploadCloud size={50} color="#888" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setImage2(e.target.files[0])}
              hidden
            />
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="form-submit-button"
        >
          {isSubmitting ? "En attente..." : "Ajouter un produit"}
        </Button>
      </form>
    </div>
  );
}
