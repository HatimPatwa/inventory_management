const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hatimp:hatimp1603@cluster0.bdp34.mongodb.net/inventory?retryWrites=true&w=majority").then((result) => {
    console.log("Mongo Cluster connected Successfully")
}).catch((err) => {
    console.log("Error : "+err);
});
