const mongoose = require('mongoose')

const userSquema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: {type: String, required: true, unique: true},  
    password: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSquema)