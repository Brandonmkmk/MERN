/*un modelo es para especificar a mongoDB que datos vamos a estar guardando*/

import mongoose from "mongoose";

/*En este caso se estaran guardando los datos userName,email y password en userSchema*/
const userSchema= new mongoose.Schema({
    /*Dentro de las llaves se le especifica el tipo de dato que se deberia mandar, ademas de que
    atreves de la propiedad required se indica que todos los datos deben ser enviados*/ 
    username:{
        type:String,
        required:true,
        /*trim elimina los espacios en blanco que se dejen intencionalmente*/
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        /*unique indica que el email es unico, es decir no puede haber 2 o mas con el mismo email*/
        unique:true 
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},{
    /*Esto es para que se guarde la fecha en la que se creo y la ultima de cuando se actualizo*/ 
    timestamps:true
})

/*todos los datos seran parte de una coleccion llamada User, el model se usa para
poder interactuar con la base de datos*/
export default mongoose.model('User',userSchema)