import { Router } from "express";
import { paymentVerification, razorPayPayment, stripePayment, stripeVerification } from "../controllers/payment.controllers.js";
import express from 'express'

const router = Router()

router.post('/create-checkout-session' , stripePayment)

router.post('/webhook', express.raw({type: 'application/json'}), stripeVerification)

export default router;