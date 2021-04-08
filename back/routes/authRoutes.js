const express = require('express')


const router = express.Router();
const User = require('../models/User')
// Require bcrypt
const bcrypt=require('bcrypt')

const isAuth=require('../middlewares/isAuth')


const {jwtkey}=require('../config')
// Require the json web token
const jwt=require('jsonwebtoken')

//register an user 
router.post('/signup' , async (req,res)=>{  
          const {email,password} =req.body
          console.log(req.body)

   try{

       let user =await User.findOne({email})
       if (user){
           res.status(400).json({err :'email already exists'})
       }// Create new User
        user = new User({email, password});
        //hashing password
       const salt=10;
       const hashedPassword=await bcrypt.hash(password,salt);
       user.password=hashedPassword;

    // saving the new user     
  await user.save()
  const token  = jwt.sign({userId : user._id},jwtkey)
    res.send({token})
  }
  catch(err){
      res.send(err.message)
  }
})
router.post('/login' , async(req,res)=>{
    const {email,password} = req.body ;
    if(!email||!password){
        return res.status(401).json({msg:" email pasword required"})
    }
    const user = await User.findOne({email})
    if (!user){
        return res.status(404).json({msg:'wrong email '})
   
   
    }
    const isMatch = await bcrypt.compare(password , user.password)
    if (!isMatch) {
        return res.status(400).json({msg:"wrong password"})
    }
    const token  = jwt.sign({userId : user._id},jwtkey)
    res.send({token})
})
router.get('/get' , isAuth, async (req,res)=>{
    res.send('email'+req.user.email)
})

module.exports = router