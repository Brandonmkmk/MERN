/*Este modulo sirve para validar datos que llegan al backend*/ 
import {z} from "zod"

/*funcion para validar el registro del usuario, el modulo z en su propiedad object se le pasan
todos los datos que se quieran validar*/ 
export const registerSchema = z.object({
    /*username tiene que ser string, en caso de que no se escriba nada dara un error
    'El usuario es requerido'*/
    username:z.string({
        required_error:"El usuario es requerido"
    }).min(4,{
       message:"El usuario debe tener al menos 4 caracteres"
    }),
    /*El email es un string pero en formato de email, si no se escribe nada da el error
    'El email es requerido' y si se escribe un formato no valido dara el mensaje 
    'Email invalido'*/ 
    email:z.string(
        {
            required_error:"El email es requerido"
        }
    ).email({
        message:"Email invalido"
    }),
    password:z.string({
        required_error:"La password es requerida"
    }).min(6,{
        message:"La password debe ser de al menos 6 caracteres"
    })
})

export const loginSchema = z.object({
    email:z.string({
        required_error:"El email es requerido"
    }).email({
        message:"Formato de email no valido"
    }),
    password:z.string({
        required_error:"La password es requerida"
    }).min(6,{
        message:"La contraseña deber ser al menos 6 caracteres"
    })
})