import {useForm} from "react-hook-form"
import { AuthContext} from "../context/authContext"
import { useContext, useEffect } from "react"
import { useNavigate,Link } from "react-router-dom"
const RegisterPages = ()=>{

    /*register viene de useForm que es para manejar el estado de los inputs*/
    const {register,handleSubmit, formState:{errors},} = useForm()

    const {signup,isAuth,errors:registerErrors} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        /*Si isAuth esta en true quiere decir que el usuario se registro correctamente
        y lo redirecciona a la ruta login*/ 
     if(isAuth) navigate('/tasks')
     
    },[isAuth])

     {/*handleSubmit de useForm me trae todos los valores que se escriben en los inputs*/ }
    const onSubmit = handleSubmit(async(values)=>{
        /*se registra el usuario con los valores del input*/
        signup(values)
    })
    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
           
        <form onSubmit={onSubmit} >
            {registerErrors&&(
                registerErrors.map((error,i)=>(
                    <div className="bg-red-500 p-2 text-white" >
                    {error}
                </div>
                ))
            )}
             {/*Este input sera requerido gracias a required:true*/}
            <input type="text" {...register('username',{required:true})} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Ingresa un nombre de usuario" />
            {errors.username && (
                <p className="text-red-500">Usuario es requerido</p>
            )}
            <input type="email" {...register('email',{required:true})} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="ingresa un email"/>
            {errors.email && (
                <p className="text-red-500">Email es requerido</p>
            )}
            <input type="password" {...register('password',{required:true})} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="ingresa tu contraseña"/>
             {errors.password && (
                <p className="text-red-500">Password es requerido</p>
            )}
            <button type="submit" className="bg-indigo-500 px-4 py-1 rounded-sm">Registrarme</button>
            <p className="flex gapx2 justify-between">
                ¿ya tienes cuenta? <Link className="text-sky-500" to="/login">iniciar sesion</Link>
            </p>
        </form>
        </div>
    )
}
export default RegisterPages