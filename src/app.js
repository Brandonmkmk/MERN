import  express  from "express";
/*Este modulo es para que me muestre en consola las peticiones que le llegan al backend*/ 
import morgan from "morgan";

/*Este modulo lo que hace es convertir una cookie a un objeto json*/ 
import cookieParser from "cookie-parser"

import cors from "cors"

/*importamos con el nombre authRoutes el router de auth.routes.js*/
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/tasks.routes.js"

/*Creamos nuestro servidor y lo guardamos en una constante llamada app*/ 
const app = express()

/*funciona para que solo el puerto 5173 pueda comunicarse con este servidor*/ 
app.use(cors({
    origin:'http://localhost:5173',
    /*Es para establecer las cookies en ese puerto*/
    credentials:true
}))

/*Se le indica al servidor que utilize el modulo morgan con su config dev*/
app.use(morgan('dev'))

/*Es para que express pueda convertir el req.body en formato JSON u objeto de JS*/
app.use(express.json())

app.use(cookieParser())

/*Se le indica al servidor que haga uso de ese enrutamiento, con esto ya se podrian procesar
las rutas que tenemos en ese archivo, todas rutas tendran antes /api, esto para que el frontend
igual pueda definir sus rutas*/
app.use("/api",authRoutes)

app.use("/api",taskRoutes)


export default app