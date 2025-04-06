const express = require("express")
const app = express()
const user = require("./user.json") 

app.get("/",(req,res)=>{
    res.status(201).json(user);
})
app.get("/cars",(req,res)=>{
    res.status(200).send("aston martin is coming soon......");
})
app.get("/random",(req,res)=>{
    let index = Math.floor(Math.random()*user.length)
    const random_user = user[index]
    res.status(200).json(random_user)
})
const port_no=5000
app.listen(port_no,()=>{
    console.log(`server listening at port: ${port_no}.........`);
})

