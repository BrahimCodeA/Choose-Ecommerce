import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    stock: { type: Boolean, default: true },
    brand: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean, default: false },
    isDiscounted: { type: Boolean, default: false },
    discountAmount: { type: Number, min: 0 },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.product || mongoose.model("Product", productSchema);
export default productModel;
