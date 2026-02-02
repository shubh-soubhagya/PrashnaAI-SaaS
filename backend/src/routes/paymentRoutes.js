
import express from "express";
import { createOrder, verifyPayment, setFreePlan } from "../controllers/paymentController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/order", auth, createOrder);
router.post("/verify", auth, verifyPayment);
router.post("/free", auth, setFreePlan);

export default router;
