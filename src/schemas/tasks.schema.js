import {z} from "zod"

export const createTaskSchema = z.object({
    title:z.string({
        required_error:"titulo es requerido"
    }).min(4,{
        message:"El titulo debe tener al menos 4 caracteres"
    }),
    description:z.string({
        required_error:"descripcion es requerida"
    })
})

export const updateTaskSchema = z.object({
    title:z.string({
        required_error:"El titulo es requerido"
    }).min(6,{
        message:"El titulo debe tener al menos 6 caracteres"
    }),
    description:z.string({
        required_error:"La descripcion es requerida"
    })

})