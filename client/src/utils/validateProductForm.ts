import { ToastType, showToast } from "@/utils/toastUtils";

type ProductFormData = {
  name: string;
  description: string;
  price: number | string;
  brand: string;
  sizes: string[];
  image1: File | null;
  image2: File | null;
};

export function validateProductForm(formData: ProductFormData): boolean {
  const { name, description, price, brand, sizes, image1, image2 } = formData;

  if (!name || !description || !price || !brand || sizes.length === 0) {
    showToast(
      "Tous les champs obligatoires doivent être remplis (Nom, Description, Prix, Marque, Tailles).",
      ToastType.ERROR
    );
    return false;
  }

  if (!image1 && !image2) {
    showToast("Vous devez télécharger au moins une image.", ToastType.ERROR);
    return false;
  }

  const numericPrice = typeof price === "string" ? Number(price) : price;
  if (isNaN(numericPrice) || numericPrice <= 0) {
    showToast(
      "Le prix doit être un nombre valide supérieur à 0.",
      ToastType.ERROR
    );
    return false;
  }

  return true;
}
