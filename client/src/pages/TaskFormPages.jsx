import { useContext, useEffect } from "react"
import {useForm} from "react-hook-form"
import { TaskContext } from "../context/taskContext"
import { useNavigate,useParams } from "react-router-dom"
const TaskFormPages = ()=>{

  const {register,handleSubmit,setValue} = useForm()
  const {createTask,getTask,updateTask} = useContext(TaskContext)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(()=>{
  const loadTask = async()=>{
    /*si existe un parametro id en la url, entonces se ejecuta la funcion getTask e imprimer por
    consola el valor que retornas*/
    if(params.id){
      const task = await getTask(params.id)
      /*setValue permite establecer valores a los inputs, al input title se le va a establecer
      el title de task, esto cuando se renderize este componente*/
      setValue('title',task.title)
      setValue('description',task.description)
     }
  }
  loadTask()
  },[])

  const onSubmit = handleSubmit((value)=>{
    /*Si existe un parametro id en le url, quiere decir que estamos editanto una tarea, y se llama a la 
    function updateTask, se le pasan como argumentos ese id de la tarea que se le dio click
    para editar y el nuevor value de los inputs*/ 
       if(params.id){
        updateTask(params.id,value)
        navigate('/tasks')
       }else{
        /*Si no hay un id como url, quire decir que estamos creando una tarea*/
        createTask(value)
        navigate('/tasks')
       }
  })
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
           <form onSubmit={onSubmit} >
            <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" placeholder="Titulo de tu tarea" 
            {...register('title',{required:true})} autoFocus />
            <textarea className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  rows="10" placeholder="Descripcion de tu tarea"
            {...register('description',{required:true})} ></textarea>
            <button className="bg-indigo-500 px-4 py-1 rounded-sm">Agregar tarea</button>
           </form>
        </div>
    )
}
export default TaskFormPages