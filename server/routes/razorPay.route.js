import { Router } from "express";
import { paymentVerification, razorPayPayment } from "../controllers/payment.controllers.js";

const router = Router()

router.post('/razorPayOrder' , razorPayPayment)

router.post('/paymentVerification' , paymentVerification)


export default router