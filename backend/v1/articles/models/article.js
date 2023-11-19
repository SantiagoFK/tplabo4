const mongoose = require('mongoose')

const articleSquema = mongoose.Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    body: { type: String, required: true},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    upvotes: { type: Number, default: 0},
    adsvotes: { type: Number, default: 0},
    isADS: { type: Boolean, default: false },
    wasADS: { type: Boolean, default: false }
})

const Article = mongoose.model("Article", articleSquema)

module.exports = Article