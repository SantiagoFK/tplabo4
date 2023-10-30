const mongoose = require('mongoose')

const articleSquema = mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    body: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

const Article = mongoose.model("Article", articleSquema)

module.exports = Article