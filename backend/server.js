const express = require('express')
const apiV1 = require('./routers/api1')

const app = express()

app.use('/v1', apiV1)

app.get("/", (req, res) => {
    res.send("homepage")
})

const server = app.listen(4000, () => {
    console.log("Server listening in port 4000")
})