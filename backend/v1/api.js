/* version 1 de la api*/
const express = require('express')
const articleRouter = require('./articles/routes/articleRouter')
const userRouter = require('./users/routes/userRouter')

const app = express.Router()

app.use("/articles", articleRouter)
app.use("/users", userRouter)

app.use((req, res) => {
    return res.status(404).json({ error: "Error 404: resource not found."})
})


module.exports = app