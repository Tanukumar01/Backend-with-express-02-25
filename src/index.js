const express = require("express")
const app = express()
const user = require("./user.json")
const userRouter = require("./routes/userRoutes")


const auth  = require("./middleware/auth")




const mongoose = require("mongoose")

app.use(express.json())


app.use("/users", userRouter)

app.get("/home", (req, res) => {
    res.status(201).json(user);
})

app.use((req,res,next)=>{
   console.log("HTTP Method -"+req.method+" URL - "+ req.url)  // this log tracking system in which if  user try to access unathorized service then it deos not allow to acces
   next()
})

app.use("/users", userRouter)

app.get("/home", auth, (req, res) => {
    const email = req.myemail

    res.status(201).send("Youre logged in as " + email);
})
app.get("/cars", (req, res) => {
    res.status(200).send("aston martin is coming soon......");
})
app.get("/random", (req, res) => {
    let index = Math.floor(Math.random() * user.length)
    const random_user = user[index]
    res.status(200).json(random_user)
})

//connection of mongoDB
mongoose.connect("mongodb+srv://tanukumar01:8427tanuK@backendcluster.3hl09rn.mongodb.net/?retryWrites=true&w=majority&appName=BackendCluster")
    .then(() => {
        const port_no = 5000
        app.listen(port_no, () => {
            console.log(`server listening at port: ${port_no}.........`);
        })
    })
    .catch((error) => {
        console.log(" Database connection Failed")
    })



