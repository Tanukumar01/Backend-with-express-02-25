const mongoose = require("mongoose")

const Usershema = mongoose.Schema({

    username:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true
    }
},{timestamps : true})

module.exports = mongoose.model("User", Usershema)