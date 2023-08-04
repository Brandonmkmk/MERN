export const validateSchema = (schema)=>(req,res,next)=>{
   try {
    /*se compara el schema que pasen como argumento con el cuerpo de la solicitud req.body*/
    schema.parse(req.body)
    /*pasa a la siguiente funcion si las validaciones del schema se cumplen*/
    next()
   } catch (error) {
    return res
    .status(404)
    .json(error.errors.map((error)=>error.message)) 
    /*del objeto error, se recorre el array errores, y tan solo se muestra la propiedad
    message de ese array de errores*/ 
   }
}