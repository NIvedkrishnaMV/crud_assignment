const express= require("express");
const morgan= require("morgan");
const app =new express();
app.use(morgan('dev'));
app.use(express.json());
let tasks=[];
app.get('/',(req,res)=>{
    res.json(tasks);
})
app.post('/add',(req,res)=>{
    tasks.push(req.body);
    res.json({message:"Task added",tasks})
});

app.get('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task=tasks.find(task=>task.id===id);
    if (!task) {
        res.send("task not found");
    }
    else{
        res.json(task)
    }
})
app.put('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const updateTask=req.body;
    const index =tasks.findIndex((task)=>task.id===id);
    if (index===-1) {
        res.send("Task not found");
    } else {
        tasks.splice(index,1,updateTask);
        res.json(tasks);
    }
});
app.delete('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const task=tasks.findIndex((task)=>task.id===id);
    if (task===-1) {
        res.send("task not found");
    }
    else{
        tasks.splice(task,1);
        res.json(tasks);
    }
});
app.listen(3000,()=>{
    console.log("Server is up and running in port 3000");
});