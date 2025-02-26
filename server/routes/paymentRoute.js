import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import { protectRoute } from "../middlewares/Auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", protectRoute, createPaymentIntent);

export default paymentRouter;
