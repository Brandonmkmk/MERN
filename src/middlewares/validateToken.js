import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../config.js"
export const authRequired = (req,res,next)=> {
const {token} = req.cookies
if(!token) return res.status(401).json({message:"No hay token"})

/*Si si existe el token, con la propiedad verify de jwt se verificara ese token, se le
pasara el TOKEN_SECRET, y un callback que se ejecuta si hay un error, y si todo sale bien
me da los datos de ese token(usuario)*/
jwt.verify(token,TOKEN_SECRET,(err,user)=>{
    /*si existen un error el verificar el token va a responder con un 
    status 401 y un mensaje de token invalido*/
    if(err) return res.status(401).json({message:"token invalido"})

    /*Si el token es verificado correctamente, se guardara ese usuario en req.user, que es
    la peticion que esta llegando*/ 
    req.user=user

    /*y continuara con la siguiente ruta, que es la de profile*/
    next()
})
}