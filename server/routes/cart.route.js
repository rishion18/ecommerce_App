import { Router } from "express";
import { isLoggedIn } from "../middlewares/middlewares.js";
import { addToCart, fetchCartDetails } from "../controllers/cart.controller.js";

const router = Router();

router.post('/addToCart' , isLoggedIn , addToCart);

router.post('/fetchCartDetails' ,isLoggedIn, fetchCartDetails)

export default router;