const { Schema, Model } = require('mongoose')

const articleSquema = new Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    body: { type: String },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
})

const Article = new Model("Article", articleSquema)

module.exports = Article