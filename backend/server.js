const express = require('express')
const mongoose = require('mongoose')

const apiV1 = require('./v1/api.js')

const app = express()

app.use('/v1', apiV1)

app.get("/", (req, res) => {
    res.send("homepage")
})

const server = app.listen(4000, () => {
    console.log("Server listening in port 4000")
})