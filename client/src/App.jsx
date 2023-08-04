import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginPages from "./pages/LoginPages"
import RegisterPages from "./pages/RegisterPages"
import { AuthProvider } from "./context/authContext"
import PagesTasks from "./pages/PagesTasks"
import HomePages from "./pages/HomePages"
import TaskFormPages from "./pages/TaskFormPages"
import ProfilePages from "./pages/ProfilePages"
import ProtectedRoutes from "./ProtectedRoutes"
import { TaskProvider } from "./context/taskContext"
import Navbar from "./components/Navbar"
function App() {
  
  return (
    <>
     <AuthProvider>
     <TaskProvider>
     <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<HomePages/>}/>
        <Route path="/login" element={<LoginPages/>}/>
        <Route path="/register" element={<RegisterPages/>}/>
        {/*ProtectedRoutes engloba a las rutas privadas, es por eso que cada que se visite una
        se va a verificar si el usuario esta autenticado o no*/ }
        <Route element={<ProtectedRoutes/>}>
        <Route path="/tasks" element={<PagesTasks/>}/>
        <Route path="/add-task" element={<TaskFormPages/>}/>
        <Route path="/tasks/:id" element={<TaskFormPages/>}/>
        <Route path="/profile" element={<ProfilePages/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
     </TaskProvider>
     </AuthProvider>
    </>
  )
}

export default App
