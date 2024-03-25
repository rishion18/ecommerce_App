import { Router } from "express";
import { 
     createProduct, 
     fetchCategoriesAndSubCategories, 
     getProduct, 
     productsByCategory, 
     productsByCategoryAndSubcategory 
      
} from "../controllers/products.controllers.js";

const router = Router();
router.get('/:category/:productId' , getProduct);


router.get('/allcategories' , fetchCategoriesAndSubCategories);

router.post('/createProduct' , createProduct);

router.get(`/:category` , productsByCategory);

router.get('/?category=categoryName&subcategory=subcategoryName' , productsByCategoryAndSubcategory);

router.get('/:productId' , getProduct);





export default router;