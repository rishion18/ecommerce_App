import { Router } from "express";
import { productsByCategoryAndSubcategory } from "../controllers/products.controllers.js";

const router = Router();

router.get('/:subCategory', productsByCategoryAndSubcategory)

export default router;