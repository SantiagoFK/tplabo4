const express = require('express')

const app = express()

app.use(express.static('public'))

const server = app.listen(4000, () => {
    console.log("Server listening in port 4000")
})