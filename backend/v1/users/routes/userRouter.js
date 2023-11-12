const express = require('express')
const userRouter = express.Router()

const { loginUser, signupUser, getAllUsers } = require('../controllers/userControllers')


userRouter.get("", getAllUsers)
userRouter.post("/login", loginUser)
userRouter.post("/signup", signupUser)

module.exports = userRouter