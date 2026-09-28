const mongoose = require('mongoose')
const { DB_URL } = require('../utils/constants')

const connectDB = async()=>{
    await mongoose.connect(DB_URL)
}

module.exports= connectDB;