const express = require('express')
const { default: mongoose } = require('mongoose')
const router = express.Router()

const Signup = require('../model/signup')

router.get('/', (req, res) => {
    res.status(200).json({msg:"Get request to /users/signup"})
})

//Email and password are the two values expected from the user
//values are carried through the body of the request
//Note -> NODEJS do not have the direct access to req.body

//Whenever we use schema for post request we have to create an object of schema

router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    const newUser = new Signup( {
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password
    } )

    Signup.find( {email: userEmail} )
        .then( result => {
            if(result.length === 0){
                newUser.save()
                    .then( result => res.status(201).json( {msg:"User Signup Successfull", userDetails: result}))
                    .catch( err => res.status(500).json( {msg:"Server encountered an error", error: err}))
            }
            else{
                res.status(400).json( {msg:"User Already Exist"})
            }
        } )
        .catch( err => res.status(500).json({msg:"Serveer Encountered an error", error: err}) )
})

router.patch('/', (req, res) => {
    //Edit password for the existing user
    //If the user exist then match the old password
    //If the user does not exit then ask to signup

    const email = req.body.email
    const oldPassword = req.body.password
    const newPassword = req.body.newPassword

    Signup.find( {email: req.body.email} )
        .then( result => {
            if(result.length === 0){
                res.status(400).json({message:'Email or password does not match. Try again with the different username or password'})
            }
            else{
                if(result[0].password === req.body.password){
                    const updateUser = {
                        _id: result[0]._id,
                        email: result[0].email,
                        password: newPassword
                    }
                    Signup.findByIdAndUpdate(result[0]._id, updateUser)
                        .then( result => res.status(200).json({message:'Password Changed!', updatedUser: result}) )
                        .catch( err => res.status(500).json({message:'Server encountered an error', detail: err}) )
                }
                else{
                    res.status(400).json({message:'Password not matching with username!'})
                }
            }
        })
        .catch( err => res.status(500).json({message:'Server encountered an error', detail: err}) )
})

router.delete('/', (req, res) => {
    res.status(200).json({msg:"Delete request to /users/signup"})
})

module.exports = router