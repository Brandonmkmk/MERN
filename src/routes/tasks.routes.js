import {Router} from "express"
import {authRequired} from "../middlewares/validateToken.js"
import {getTasks,createTask,getTask,updateTask,deleteTask} from "../controllers/tasks.controller.js"
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createTaskSchema,updateTaskSchema } from "../schemas/tasks.schema.js"
 const router = Router()

/*ruta para obtener todas las tareas*/ 
router.get('/tasks',authRequired,getTasks)
/*ruta para obtener una sola mediante su id*/ 
router.get('/tasks/:id',authRequired,getTask)
/*ruta para crear una nueva*/
router.post('/tasks',authRequired,validateSchema(createTaskSchema),createTask)
/*ruta para eliminar una mediante su id*/ 
router.delete('/tasks/:id',authRequired,deleteTask)
/*ruta para modificar una tarea mediante su id*/ *
router.put('/tasks/:id',authRequired,validateSchema(updateTaskSchema),updateTask)

export default router