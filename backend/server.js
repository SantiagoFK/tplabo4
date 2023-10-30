const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
require('dotenv').config()

const apiV1 = require('./v1/api.js')

const app = express()

app.use(express.json())
app.use(logger("dev"))

app.use('/v1', apiV1)

app.get("/", (req, res) => {
    res.send("homepage")
})

//conexion con la base de datos
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Database connected successfully")

        //si la base de datos se inicia, se inicia el servidor
        app.listen(process.env.PORT, () => {
            console.log(`Server started at: http:/localhost:${process.env.PORT}/v1/articles`)
        })
    })
    .catch((error) => console.log(error))

