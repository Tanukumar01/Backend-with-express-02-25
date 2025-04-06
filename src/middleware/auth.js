const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{

   try{
       let token = req.headers.authorization
       if(token){
        token = token.split(" ")[1]
        let user = jwt.verify(token,"tanukumar")
        req.myemail=user.email
       }
       else{
        res.status(401).json({message:"You are not Authorized for this service "})

       }
       next()
   }
   catch(error){
           console.log(error)
           res.send("somthing went wrong Brooo")
   }
}
module.exports = auth