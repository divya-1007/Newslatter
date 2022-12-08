const mongoose = require("mongoose");
const Items = new mongoose.Schema({
    itemName:{
        type:String
    }
})

module.exports = mongoose.model("item",Items)