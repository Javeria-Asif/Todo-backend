const express = require('express');
const mongoose = require('mongoose');
const db = "mongodb+srv://javeriaasif70:Javeria@cluster0.q4axtk1.mongodb.net/To-Do"
const cors = require('cors');
const todomodel = require('./models/todo')

const app = express()
app.use(cors())

app.use(express.json())

app.use('/', (req,res)=>{
    res.json({message:"hello from express app"})
});


mongoose.connect(db).then(() => {
    console.log("connection successfull")
}).catch((err) => console.log("no connection"))

app.get('/get', (req, res) => {
    todomodel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    todomodel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    todomodel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    todomodel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log(`server is running on port`)
})
module.exports = app;

