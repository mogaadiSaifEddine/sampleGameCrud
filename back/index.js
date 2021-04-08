const express = require ('express') ;
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const PORT  = 8998
const {mongoUri}= require('./config')
const authRoutes=require('./routes/authRoutes') 
const game = require('./routes/game')
const User = require('./models/User')


mongoose.connect(mongoUri,{
    useNewUrlParser : true , 
    useUnifiedTopology:true
})
mongoose.connection.on('connected' ,()=>{
    console.log('mongo connected')
})
mongoose.connection.on('error' ,()=>{
    console.log('mongo error')
})

app.use(bodyParser.json())
app.use('/',authRoutes)
app.use('/',game)
 
app.get('/' ,(req,res)=>{
    res.send('hello')
} )




app.post('/' , (req,res)=>{
    console.log(req.body)
    res.send('cc')

})

app.listen(PORT ,()=>{
    console.log('server is running on '+PORT )
})