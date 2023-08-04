import { useContext, useEffect } from "react"
import { AuthContext } from "../context/authContext"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const LoginPages = ()=>{
    
    const {register,handleSubmit, formState:{errors},} = useForm()
    const {errors:loginErrors,signIn,isAuth} = useContext(AuthContext)
    const navigate = useNavigate()


    useEffect(()=>{
  if(isAuth){
   navigate('/tasks')
  }
    },[isAuth])

    const onSubmit = handleSubmit((values)=>{
        /*se registra el usuario con los valores del input*/
        signIn(values)
    })

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {loginErrors.map((error,i)=>(
                 <div className="bg-red-500 p-2 text-white my-2" key={i} >
                 {error}
             </div>
            ))}
            <form onSubmit={onSubmit} >
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
            <button type="submit" className="bg-indigo-500 px-4 py-1 rounded-sm">Iniciar sesion</button>
            <p className="flex gapx2 justify-between">
                ¿aun no tienes una cuenta? <Link className="text-sky-500" to="/register">crea una</Link>
            </p>
            </form>
        </div>
    )
}
export default LoginPages