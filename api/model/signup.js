//model -> a file specifying the amount of data and the type of data that is going to be posted through the request.
//schema -> define the no. of properties and there types.

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema( {
    _id: mongoose.Schema.Types.ObjectId,
    email: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    newPassword: mongoose.Schema.Types.String
} )

module.exports = mongoose.model('Signup', userSchema)