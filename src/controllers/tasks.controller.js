import Task from "../models/task.model.js"

/*Como son peticiones a la bd, tienes que ser funciones asincronas*/ 
export const getTasks = async (req,res)=>{
  try {
    const tasks=await Task.find({
      /*Con esto solo se buscan las tareas que le pertenezcan al usuario actual, y no todas las demas*/
      user:req.user.id
    }).populate('user') /*Con esto no solo estamos trayendo el id del usuario, si no que todos los
    datos relacionados con el usuario que creo la tarea*/
    res.json(tasks)
  } catch (error) {
    return res.status(404).json({message:error.message})
  }
}

export const createTask = async (req,res)=>{
try {
  /*Aquí se están extrayendo las propiedades title, description y date del 
cuerpo de la solicitud (req.body). Esto asume que el cuerpo de la solicitud contiene 
un objeto JSON con esas propiedades.*/
const {title,description,date} = req.body

const newTask = new Task({
    title,
    description,
    date,
    /*Se establece el ID del usuario actual*/
    user:req.user.id
})
const saveTask = await newTask.save()
res.json(saveTask)
} catch (error) {
  return res.status(404).json({error:error.message})
}


}

export const getTask = async (req,res)=>{
  try {
      /*el req.params.id es lo que escriban en la ruta /tasks/:id
    es decir esto se veria asi /tasks/req.params.id*/
const taskFound=await Task.findById(req.params.id).populate('user')

/*si no se encontro la tarea, se ejecuta esto:*/
if(!taskFound) return res.status(404).json({message:"no se encontro la tarea"})

/*si se encuentra, me va a responder con esa tarea*/
res.json(taskFound)
  } catch (error) {
    return res.status(404).json({error:error.message})
  }
}
export const updateTask = async (req,res)=>{
   try {
     /*findByIdAndUpdate se utiliza para buscar una tarea en la bd segun el ID proporcionado
    en los parametros de la solicitud 'req.params.id', y actualizarla con los datos en req.body
    , la opcion {new:true} indica que se devuelva la tarea actualizada despues de la actualizacion*/
    const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true})
    
    /*si no se encontro la tarea, se ejecuta esto:*/
    if(!taskFound) return res.status(404).json({message:"no se encontro la tarea"})

    /*si se encuentra, me va a responder con esa tarea que se actualizo*/ 
    res.json(taskFound)
   } catch (error) {
    return res.status(404).json({error:error.message})
   }
}
export const deleteTask = async (req,res)=>{
    try {
      /*Elimina una tarea mediante el parametro id de la peticion*/
    const taskFound = await Task.findByIdAndDelete(req.params.id)
    /*si no se encontro la tarea, se ejecuta esto:*/
    if(!taskFound) return res.status(404).json({message:"no se encontro la tarea"})

   return res.sendStatus(204)
    } catch (error) {
      res.status(404).json({message:error.message})
    }
}
