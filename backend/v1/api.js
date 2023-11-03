/* version 1 de la api*/
const express = require('express')
const articleRouter = require('./articles/routes/articleRouter')
const userRouter = require('./users/routes/userRouter')

const app = express.Router()

app.use("/articles", articleRouter)
app.use("/users", userRouter)


module.exports = app