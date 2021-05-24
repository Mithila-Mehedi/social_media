const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', (req,res) => {
    res.send('HELLO')
})

router.post('/signup', (req,res) => {
//    console.log( req.body.name);

const {name, email, password} = req.body
if(!email || !password || !name){
    return res.json({error:"Please add all the field"})
}
// res.json({message:"successfully posted"})

User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.json({error:"user already exists with email"})
        }
bcrypt.hash(password,12)
      .then(hashedpassword => {
        const user = new User({
            email,
            password : hashedpassword,
            name
        })
   
    user.save()
    .then(user => {
        res.json({message:"saved successfully"})
    })

    .catch(err => {
        console.log(err);
    })
        
      })
      
})
.catch(err => {
    console.log(err);
})
})

router.post('/signin', (req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        res.json({error:"please add email or password"})
    }
    User.findOne({email:email})
        .then(savedUser =>{
            if(!savedUser){
                res.json({error:"Invalid Email or password"})
            }
            bcrypt.compare(password,savedUser.password)
                  .then(doMatch => {
                      if(doMatch){
                          res.json({message:"successfully signed in"})
                      }else{
                        res.json({error:"Invalid Email or password"})
                      }
                  })
                  .catch(err => {
                      console.log(err);
                  })
        })
})

module.exports = router