import {createContext, useEffect, useState} from "react"
import {loginRequest, registerRequest, verifyTokenRequest} from "../api/auth"
import Cookies from "js-cookie"


 export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    /*estado para verificar si el usuario ya esta autenticado*/
    const [isAuth,setIsAuth] = useState(false)
    const [errors,setErrors] = useState([])
    const [loading,setLoading] = useState(true)
    

    /*funcion para registro de usuario*/ 
    const signup = async (user)=>{
       try {
        const res= await registerRequest(user)
       setUser(res.data)
       setIsAuth(true)
       } catch (error) {
        setErrors(error.response.data)
       }
    }

    /*Funcion para iniciar sesion*/ 
    const signIn = async(user)=>{
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuth(true)
            
        } catch (error) {
            if(Array.isArray(error.response.data)){
                /*si es un array el error, se establece tal cual*/
                return setErrors(error.response.data)
            }
            /*Pero si es un objeto, se crea un array con el valor de error de ese objeto*/ 
            setErrors([error.response.data.message])
            // console.log(errors)
        }
    }

    /*Funcion para solicitar al backend cerrar sesion*/
    
    const logout = ()=>{
        Cookies.remove("token");
        setIsAuth(false)
        setUser(null)
    }

    /*Si el array errores contiene mas de un elemento, quiere decir que hay errores,
    entonces los quitamos despues de 5 segundos gracias al setTimeOut*/
    useEffect(()=>{
     if (errors.length>0){
        const timer=setTimeout(()=>{
            /*Se igualara errors a un array vacio, por lo que se eliminaran de la pantalla*/ 
            setErrors([])
        },5000)
        return ()=>clearTimeout(timer)
     }
    },[errors])

    useEffect(()=>{
      async function checkLogin(){
          /*obtiene todas las cookies*/ 
    const cookies = Cookies.get()

    /*Si no existe un token dentro de las cookies, quiere decir que no hay usuario*/ 
    if(!cookies.token){
       setIsAuth(false)
       setLoading(false)
       return setUser(null)
    }
    /*Si existe se ejecuta esto*/ 
    try {
        /*token si existe pero lo envia el backend para que se verifique si es valido*/
        const res= await verifyTokenRequest(cookies.token)
        /*Si el backend no me esta respondiendo ningun, el usuario no esta auntenticado
        y no esta cargando*/ 
       if(!res.data) {
        setIsAuth(false)
        setLoading(false)
        return 
       }
       /*Si el backend me responde con un dato, quiere decir que el usuario si esta autenticado
       y se establecen los datos de la respuesta en setUser*/ 
       setIsAuth(true)
       setUser(res.data)
       setLoading(false)
    }catch(error){
      console.log(error)
      setIsAuth(false)
      setUser(null)
      setLoading(false)
    }
      }
      checkLogin()
    },[])
    return (
        <AuthContext.Provider value={{
        signup,
        signIn,
        user,
        isAuth,
        errors,
        loading,
        logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}