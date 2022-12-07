const mongoose = require('mongoose')

const UserData = new mongoose.Schema({
    title:{
        type:String ,
    },
    content:{
        type:String,
    }
})

module.exports = mongoose.model('userData' ,UserData)