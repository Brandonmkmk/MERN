import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
},
date:{
    type:Date,
    default:Date.now
},

user:{
    /*type el el objectID en la base de datos*/ 
    type:mongoose.Schema.Types.ObjectId,
    /*Hace referencia al modelo User que esta en user.model.js*/ 
    ref:'User',
    required:true
}
},
{
    timestamps:true
})

export default mongoose.model('Task',taskSchema)