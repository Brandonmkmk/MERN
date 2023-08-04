import mongoose from "mongoose";

/*funcion que conecta a la base de datos*/
export const connectDB = async()=>{
try {
    /*se utiliza mongodb://127.0.0.1:27017/merndb ya que se especifica de referirse a la
    direccion IPv4 de localhost */
await mongoose.connect('mongodb://127.0.0.1:27017/merndb')
console.log("se conecto la base de datos con exito")
} catch (error) {
console.log('ocurrio el error:',error)
}
}