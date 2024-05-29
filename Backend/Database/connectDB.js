const mongoose = require("mongoose");

module.exports.connectDB = ()=>{
    try {
        const uri = process.env.MONGO_URI
        mongoose.connect(uri);
        console.log("Database Connected Successfully :)");
    } catch(error) {
        console.log(error);
    }
}