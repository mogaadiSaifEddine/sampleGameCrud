const mongoose = require('mongoose')
const gameShema = new mongoose.Schema ({
    name :{
        type : String,
        required:true
    }
    ,
  image:  {
        name: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    }
})
module.exports=mongoose.model('games' ,gameShema);