const express = require("express")
const userRouter = express.Router()
const usermodel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


userRouter.post("/singUp", async (req, res) => {

    const { username, password, email } = req.body

    try {
        const existingUser = await usermodel.findOne({ email: email })
        if (existingUser) {

            console.log("user Already Existing")
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const result = await usermodel.create({
                username: username,
                password: hashPassword,
                email: email
            })
            const token = jwt.sign({email:result.email, id:result._id}, "Tanukumar")
            res.status(201).send({user:result,token:token})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send("something went worang")
    }

})
userRouter.post("/SingIn", async (req, res) => {
    const {email, password} = req.body

    try{
        const existingUser = await usermodel.findOne({email:email})

        if(existingUser){

            const matchPassword = await bcrypt.compare(password, existingUser.password)
            if(!matchPassword){
                res.status(200).send("your password is wrong")
            }else{
                const token = jwt.sign({email:existingUser.email, id:existingUser._id},"tanukumar")
        
                res.status(200).send({user:existingUser,token:token})
            }

            
        }
        else{
            res.status(404).send("user not have any account")
        }

    }
    catch(error){
        res.send(error)
        
    }
})
module.exports = userRouter

