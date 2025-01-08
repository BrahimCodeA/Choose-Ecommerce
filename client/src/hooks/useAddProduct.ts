import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/slices/productsSlice";
import { showToast, ToastType } from "@/utils/toastUtils";

export const useAddProduct = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [stock, setStock] = useState(true);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sizes, setSizes] = useState<number[]>([]);
  const [bestseller, setBestseller] = useState(false);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [discountAmount, setDiscountAmount] = useState<number | string>("");
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setStock(true);
    setCategory("Homme");
    setBrand("");
    setSizes([]);
    setBestseller(false);
    setIsDiscounted(false);
    setDiscountAmount(0);
    setImage1(null);
    setImage2(null);
  };

  const handleAddSize = (size: number) => {
    if (!sizes.includes(size)) {
      setSizes((prevSizes) => [...prevSizes, size]);
    } else {
      showToast("Cette taille est déjà ajoutée.", ToastType.WARNING);
    }
  };

  const handleRemoveSize = (size: number) => {
    setSizes((prevSizes) => prevSizes.filter((s) => s !== size));
  };

  const handleRomveAllSizes = () => {
    setSizes([]);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setDiscountAmount(isNaN(value) ? 0 : value);
  };

  const validateForm = () => {
    if (!name || !description || !price || !brand || sizes.length === 0) {
      showToast(
        "Tous les champs obligatoires doivent être remplis.",
        ToastType.ERROR
      );
      return false;
    }

    if (!image1 && !image2) {
      showToast("Vous devez télécharger au moins une image.", ToastType.ERROR);
      return false;
    }

    return true;
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", String(price));
    formData.append("stock", String(stock));
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", String(bestseller));
    formData.append("isDiscounted", String(isDiscounted));
    formData.append("discountAmount", String(discountAmount));
    if (image1) formData.append("image1", image1);
    if (image2) formData.append("image2", image2);

    try {
      const response = await axios.post(`/api/product/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addProduct(response.data));
      showToast("Produit ajouté avec succès", ToastType.SUCCESS);
      resetForm();
    } catch (error) {
      console.error(error);
      showToast("Erreur d'ajout", ToastType.ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};
