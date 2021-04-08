const mongoose = require('mongoose')
const userShema = new mongoose.Schema ({
    email :{
        type : String,
        unique:true ,
        required:true
    }
    ,
    password :{
        type : String , 
        required:true 
    }
})
module.exports=mongoose.model('users' , userShema);