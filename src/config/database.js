// const {MongoClient} = require("mongodb")

const mongoose = require('mongoose')
const url = process.env.CONNECTION_STRING

const dbConnect = async () => {
    try{
        await mongoose.connect(url)
    } catch(err){
        
    }
}

module.exports = dbConnect;
