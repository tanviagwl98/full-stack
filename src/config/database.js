// const {MongoClient} = require("mongodb")

const mongoose = require('mongoose')
const url = process.env.CONNECTION_STRING

const dbConnect = async () => {
    try{
        await mongoose.connect(url)
    } catch(err){
        console.error("MongoDB Connection Error:", err);
        throw err;
    }
}

module.exports = dbConnect;
