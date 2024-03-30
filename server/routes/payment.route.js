import { Router } from "express";
import { stripePayment } from "../controllers/payment.controllers.js";

const router = Router()

router.post('/create-checkout-session' , stripePayment)

export default router;