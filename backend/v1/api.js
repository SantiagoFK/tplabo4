/* version 1 de la api*/
const express = require('express')
const articleRouter = require('./articles/routes/articleRouter')

const app = express.Router()

app.use("/articles", articleRouter)

module.exports = app