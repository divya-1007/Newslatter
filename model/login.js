require('dotenv').config()
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

const Login = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})

Login.plugin(encrypt, { secret: process.env.secret  ,encryptedFields:['password']});
module.exports =  mongoose.model('login',Login)