import { Router } from "express";
import { 
     createProduct, 
     fetchCategoriesAndSubCategories, 
     getProduct, 
     getTopDeals, 
     productsByCategory, 
      
} from "../controllers/products.controllers.js";

const router = Router();

router.get('/getTopDeals' , getTopDeals);

router.get('/:category/:productId' , getProduct);


router.get('/allcategories' , fetchCategoriesAndSubCategories);

router.post('/createProduct' , createProduct);

router.get(`/:category` , productsByCategory);




export default router;