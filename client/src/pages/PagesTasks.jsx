import { useContext, useEffect } from "react"
import { TaskContext } from "../context/taskContext"
import { AuthContext } from "../context/authContext"
import TaskCard from "../components/TaskCard"


const PagesTasks = ()=>{
    const {getTasks,tasks} = useContext(TaskContext)

    useEffect(()=>{
    getTasks()
    },[])
    if(tasks.length==0) {
        return <h1>No hay tareas</h1>
    }
    return <>
    
    <div className="flex gap-6">
    {tasks.map((task)=>(
        <TaskCard task={task} key={task._id}/>
     ))}
    </div>
    </>
}
export default PagesTasks