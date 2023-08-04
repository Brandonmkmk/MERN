import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"


const Navbar = ()=>{

    const {isAuth,user,logout} = useContext(AuthContext)
    return (
        <>
          <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold">Crud Tasks</h1>
            <ul className="flex gap-x-2">
                {isAuth?(
                   <>
                    <li>
                        Bienvenido ¡{user.username}!
                        
                    </li>
                    <li>
                        <Link to="/add-task" className="bg-indigo-500 px-4 py-1 rounded-sm">Agregar tarea</Link>
                    </li>
                    <li>
                        <Link to="/" className="bg-indigo-500 px-4 py-1 rounded-sm" onClick={()=>{
                            logout()
                        }}>Cerrar sesion</Link>
                    </li>
                   </>
                ):(
                      <>
                      <li>
                        <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">login</Link>
                      </li>
                      <li>
                        <Link to="/register" className="bg-indigo-500 px-4 py-1 rounded-sm">Registrarme</Link>
                      </li>
                      </>
                )}
            </ul>
          </nav>
        </>
    )
}
export default Navbar