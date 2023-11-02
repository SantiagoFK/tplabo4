const express = require('express')
const userRouter = express.Router()

const { loginUser, signupUser } = require('../controllers/userControllers')


userRouter.post("/login", loginUser)
userRouter.post("/signup", signupUser)

module.exports = userRouter