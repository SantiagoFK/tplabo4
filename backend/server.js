const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const colors = require('colors')
require('dotenv').config()

const apiV1 = require('./v1/api.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger("dev"))

app.use('/v1', apiV1)

app.get("/", (req, res) => {
    res.send("homepage")
})

//conexion con la base de datos
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log(colors.white.bgMagenta.underline("\nMongoDB connected successfully\n"))

        //si la base de datos se inicia, se inicia el servidor
        app.listen(process.env.PORT, () => {
            //lo que se printea aca se puede mejorar en formato.
            console.log(colors.white.bgMagenta.underline(`Articles service started at: http://localhost:${process.env.PORT}/v1/articles`))
            console.log(colors.white.bgMagenta.underline(`\nUsers service started at: http://localhost:${process.env.PORT}/v1/users`))
        })
    })
    .catch((error) => console.log(error))

