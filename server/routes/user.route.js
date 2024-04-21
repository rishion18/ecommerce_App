import { Router } from "express";
import { fetchUser, getAllOrdersForUser, newTokens, userLogin, userRegister } from "../controllers/users.controller.js";
import { isLoggedIn } from "../middlewares/middlewares.js";

const router = Router();

router.post('/userRegister' , userRegister);
router.post('/userLogin' , userLogin);
router.post('/newTokens' , newTokens);
router.get('/fetchUser' ,isLoggedIn , fetchUser);
router.get('/yourOrders' , getAllOrdersForUser);


export default router