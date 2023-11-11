const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')
const colors = require('colors')
const socket = require('socket.io')
const http = require('http')
require('dotenv').config()

const apiV1 = require('./v1/api.js')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger("dev"))
app.use(express.static('public'))

app.use('/v1', apiV1)


app.get("/", (req, res) => {
    res.render('index.html')
})

const server = http.createServer(app)

//conexion con la base de datos
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log(colors.white.bgMagenta.underline("\nMongoDB connected successfully\n"))

        //si la base de datos se inicia, se inicia el servidor
        server.listen(process.env.PORT, () => {
            //lo que se printea aca se puede mejorar en formato.
            console.log(colors.white.bgMagenta.underline(`Articles service started at: http://localhost:${process.env.PORT}/v1/articles`))
            console.log(colors.white.bgMagenta.underline(`\nUsers service started at: http://localhost:${process.env.PORT}/v1/users`))
        })

        const io = socket(server)
        io.on('connection', (socket) => {
            console.log("Made socket connection ", socket.id)

            /*socket.on('chat', (data) => {   
                io.sockets.emit('chat', data)
            })*/
        })

    })
    .catch((error) => console.log(error))

