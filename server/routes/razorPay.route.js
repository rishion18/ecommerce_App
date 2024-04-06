import { Router } from "express";
import { razorPayPayment } from "../controllers/payment.controllers.js";

const router = Router()

router.post('/razorPayOrder' , razorPayPayment)

export default router