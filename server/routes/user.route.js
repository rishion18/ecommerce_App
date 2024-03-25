import { Router } from "express";
import { fetchUser, newTokens, userLogin, userRegister } from "../controllers/users.controller.js";
import { isLoggedIn } from "../middlewares/middlewares.js";

const router = Router();

router.post('/userRegister' , userRegister);
router.post('/userLogin' , userLogin);
router.post('/newTokens' , newTokens);
router.get('/fetchUser' ,isLoggedIn , fetchUser);


export default router