/*Se importa Router de express para manejar las rutas*/ 
import {Router} from "express";
import { register,login,logout,profile,verifyToken } from "../controllers/auth.controller.js";
import {authRequired} from "../middlewares/validateToken.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

/*Con esto ya se puede crear multples rutas, es decir peticiones post,put,delete,etc*/ 
const router = Router()

router.post('/register',validateSchema(registerSchema),register)
router.post('/login',validateSchema(loginSchema),login)
router.post('/logout',logout)
router.get('/verify',verifyToken)
/*Primero pasara por la funcion authRequired, si ya tiene el usuario guardado, pasara a la
ruta profile pero si no, no se podra acceder a la ruta profile*/
router.get('/profile',authRequired,profile)

export default router