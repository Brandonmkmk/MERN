/*Este archivo estara relacionado con auth.routes.js*/ 

import User from "../models/user.model.js"
/*Modulo para encriptar contraseñas*/ 
import bcrypt from "bcryptjs"
import {createAccesToken} from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export const register = async(req,res)=>{
    /*el req.body es el cuerpo de la solicitud*/
    const {email,password,username} = req.body
     
    try {
 
        /*Se busca un usuario en el modelo User por su email*/ 
        const userFound  = await User.findOne({email})

        /*Si existe un usuario con ese email, se ejecuta esto:*/ 
        if(userFound)
        return res.status(400).json(['El email ya esta en uso'])

        /*el metodo hash es para convertir un string a caracteres alazar, recibe el
        valor que quiere convertir, en este caso la password*/
        const paasswordHash = await bcrypt.hash(password,10)
        
        
        /*Cuando se cree un nuevo usuario, se pasara el username,email y password del req.body como valores
    al modelo de usuario que esta en user.model.js*/
    const newUser= new User({
        username,
        email,
        password:paasswordHash
    })
    /*en userSaved se guardara un nuevo usuario en la bd gracias a newUser.save que es para guardarlo en la base de datos*/
    const userSaved=await newUser.save()

    /*Se crea un nuevo token, y el payload es igual al id del usuario creado*/ 
    const token=await createAccesToken({id:userSaved._id})
   
    /*crea una cookie para la respuesta, la cookie se llamara token y tendra como valor
       el token que se ha creado*/
       res.cookie('token',token)

    /*Cuando el servidor responda, lo hara con un json con el id,username y email del usuario creado
    ya que esto es lo que se pintara en el frontend*/
    res.json({
        id:userSaved._id,
        username:userSaved.username,
        email:userSaved.email
    })
    } catch (error) {
        /*Si hay error se responde al cliente con un status 500 y con un json con un msj de error*/
        res.status(500).json({message:error.message})
    }
  
}

export const  login = async(req,res)=>{

 /*como solo se podra loguear con email y password, solo se hacen uso de esos 2 datos del body*/   
const {email,password} = req.body
     
try {
    /*del modelo User va a buscar un usuario por su email*/
    const userFound= await User.findOne({email})

    /*Si no existe el usuario, respondera con un status 400 y un mensaje*/
    if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});

    /*Si existe el usuario, con el metodo compare de bcrypt se comparara la password que el user
    esta enviando a traves del req.body con la password del usuario encontrado en la bd, esto
    devolvere un true o false*/
    const isMatch = await bcrypt.compare(password,userFound.password)
    
    /*Si es false, quiere decir que las contraseñas no coinciden y respondera
    con un status 400 y un mensaje*/
    if(!isMatch) return res.status(400).json({message:"contraseña incorrecta"})

    /*Se crea un token mediante el id del usuario encontrado*/
const token=await createAccesToken({id:userFound._id})

res.cookie('token',token)

res.json({
    id:userFound._id,
    username:userFound.username,
    email:userFound.email
})
} catch (error) {
    
    res.status(500).json({message:error.message})
}
}

export const logout = (req,res)=>{
    /*el token se igualara a vacio*/
  res.cookie('token','',{
    expires:new Date(0)
  })
  return res.sendStatus(200)
}

export const verifyToken = async(req,res)=>{
    /*se extrae el token de las cookies en la solicitud entrante*/ 
const {token}=req.cookies

/*Si no se proporciona ningún token, responde con un estado de error 401 (No autorizado)
 y un mensaje indicando que el usuario no está autorizado.*/ 
if(!token)
    return res.status(401).json({message:"no estas autorizado"});

    /*Si se proporciona un token, utiliza la biblioteca jwt.verify() 
    para verificar la validez del token.*/ 
    jwt.verify(token,TOKEN_SECRET,async(err,user)=>{

        /*Si hay un error al verificar el token 
        (por ejemplo, si el token está caducado o inválido),
         responde con un estado de error 401 (No autorizado) 
         y un mensaje indicando que la autorización ha fallado.*/ 
        if(err) return res.status(401).json({message:"no autorizado"})

        /*Si el token es válido, utiliza el user.id del token para 
        buscar el usuario correspondiente en una base de datos */ 
        const userFound = await User.findById(user.id)

        /*Si no encuentra el usuario devuelve un message con un error*/
        if(!userFound) return res.status(401).json({message:"no autorizado"})

        /*si se encuentra el usuario, respondera en un json con la informacion
        de ese usuario*/ 
        return res.json({
            id:userFound._id,
            username:userFound.username,
            email:userFound.email
        })
    })
}

export const profile = async (req,res)=>{
    /*Esto dara usuario completo, es decir todos los datos que le pertenecen a ese usuario*/
    const userFound= await User.findById(req.user.id)

    /*Si no existe un usuario, se ejecuta esta respuesta*/
    if(!userFound) return res.status(400).json({message:"usuario no encontrado"})

    /*Si existe se ejecutara esta respuesta*/
    return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email
    })
    res.send('profile')
}