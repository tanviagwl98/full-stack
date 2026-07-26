// const {MongoClient} = require("mongodb")

const mongoose = require('mongoose')
const url = "mongodb+srv://vini98agwl:Happiness98@nodelearning.lydi9.mongodb.net/devMatchDb"

const dbConnect = async () => {
    await mongoose.connect(url)
}

module.exports = dbConnect;
