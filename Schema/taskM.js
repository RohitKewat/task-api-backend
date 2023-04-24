const mongoose = require('mongoose');


const Schema = mongoose.Schema ;
const ObjectId = Schema.ObjectId;


const taskSchema = new Schema({

    title : {type : String , required : true},
    is_completed : {type : Boolean , required : true}
})

const taskModel = mongoose.model('task',taskSchema) ;
module.exports = taskModel

