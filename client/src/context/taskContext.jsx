import { createContext, useState } from "react";
import { createTaskRequest,
    getTaskRequest,
    getTasksRequest,
    updateTaskRequest,
    deleteTaskRequest } 
from "../api/tasks";

export const TaskContext = createContext()

export const TaskProvider = ({children}) =>{
    const [tasks,setTasks] = useState([])

    const getTasks = async () =>{
        try {
            const res = await getTasksRequest()
           setTasks(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task) =>{
       const res = await createTaskRequest(task)
       
    }

    const getTask = async(id)=>{
        const res = await getTaskRequest(id)
        return res.data
    }
    const updateTask = async(idTask,newValuesForTask)  =>{
       const res = await updateTaskRequest(idTask,newValuesForTask)
    }
    const deleteTask = async(id)=>{
    try {
        const res = await deleteTaskRequest(id)
        /*Si la solicitud al backend me respondio con un estado 204
        entonces filtra todas las tareas que por su propiedad id no sean igual
        al id que se esta pasando como argumento, es decir crea un nuevo arreglo
        pero sin la tarea a la que se le dio click*/
        if(res.status ===204) setTasks(tasks.filter((task)=>task._id !== id))
    } catch (error) {
        console.log(error.response.data.message)
    }
    }

    return (
        <TaskContext.Provider value={{
     tasks,
     createTask,
     getTasks,
     getTask,
     updateTask,
     deleteTask,
     tasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}