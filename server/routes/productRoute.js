import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { adminRoute, protectRoute } from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  protectRoute,
  adminRoute,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  addProduct
);
productRouter.delete("/remove/:id", protectRoute, adminRoute, removeProduct);
productRouter.get("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
