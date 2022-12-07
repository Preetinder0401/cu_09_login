const express = require('express')
const router = express.Router()
const Signup = require('../model/signup')

router.get('/', (req, res) => {
    res.status(200).json({msg:"Get request to /users/login"})
})

router.get('/:id', (req, res) => {
    const queryParam = req.params.id
    res.status(200).json({msg:`Get request to /users/login/${queryParam}`})
})

//Any data snet in the post request is carried through the body of request
router.post('/', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password

    //Function to filter all the documents in the database where the email(req.body.email) provided by the body matches the document
    //Signup.find( filter ) ->  Signup.find( {dbproperty : condition} )
    //If we use the find method, the result will be array
    //If we use filter in the find method and condition does not match with the database then the result will be empty array.

    Signup.find( {email: userEmail} )
        .then( result => {
            if(result.length === 0){
                res.status(400).json({msg:"Record Not Found", records: result})
            }
            else{
                if(userPassword === result[0].password){
                    res.status(200).json({msg:"User Authenticated"})
                }
                else{
                    res.status(400).json({msg:"User Authentication failed"})
                }
            }
        } )
        .catch( err => res.status(500).json({msg:"Serveer Encountered an error", error: err}) )
})

router.patch('/', (req, res) => {
    res.status(200).json({msg:"Patch request to /users/login"})
})

router.delete('/', (req, res) => {
    res.status(200).json({msg:"Delete request to /users/login"})
})

module.exports = router