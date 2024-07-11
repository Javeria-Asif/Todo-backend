const mongoose=require('mongoose')
const todoschema = new mongoose.Schema({
    task: String,
    done:{
        type : Boolean,
        default : false
    }
})
const todomodel = mongoose.model("todo",todoschema)
module.exports = todomodel