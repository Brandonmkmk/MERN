import { useContext } from "react"
import { AuthContext } from "./context/authContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = ()=>{
    const {loading,isAuth} = useContext(AuthContext)

    /*Si loading es true regresa un h1*/ 
    if(loading) return <h1>Cargando...</h1>

    /*Si isAuth es false y loading es false va a navegar al login
    esto quiere decir que el usuario no esta logeado*/ 
    if(!isAuth && !loading){
        return <Navigate to='/login' replace/>
    }
 
    /*Si isAuth es true y loading true, entonces se navegara a la ruta que se desee*/ 
    return <Outlet/>
}
export default ProtectedRoutes