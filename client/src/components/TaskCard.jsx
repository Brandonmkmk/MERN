import { useContext } from "react"
import { TaskContext } from "../context/taskContext"
import { Link } from "react-router-dom"

const TaskCard = ({task})=>{
    const {deleteTask} = useContext(TaskContext)
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md" >
            <h1 className="text-2xl font-bold ">{task.title}</h1>
            <h2 className="text-slate-300">{task.description}</h2>
            <p>{new Date(task.date).toLocaleDateString()}</p>
            <div className="flex gap-2 mt-3">
                <button onClick={()=>{
                    deleteTask(task._id)
                }} className="bg-red-500 px-4 py-1 rounded-sm">Borrar</button>
                <Link to={`/tasks/${task._id}`}>Editar</Link>
            </div>
        </div>
    )
}
export default TaskCard