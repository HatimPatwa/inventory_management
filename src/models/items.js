const mongoose = require("mongoose");


const itemSpec = new mongoose.Schema({
    item:{
        type:String,
        required:true
    },
    container:{
        type:String,
        required:true
    },
    qty:{
        type:String
    }
});


module.exports = new mongoose.model("Item",itemSpec);