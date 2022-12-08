require('dotenv').config()
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const passportLocalMongoose = require('passport-local-mongoose')
const findOrCreate = require('mongoose-findorcreate');

const Login = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    googleId:{
        type:String
    },
    secret:{
        type:String
    }
})

Login.plugin(passportLocalMongoose)
Login.plugin(findOrCreate);

// Login.plugin(encrypt, { secret: process.env.secret  ,encryptedFields:['password']});
module.exports =  mongoose.model('login',Login)