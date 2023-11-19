const express = require('express')
const userRouter = express.Router()

const { 
    loginUser, 
    signupUser, 
    getAllUsers, 
    getUserStats 
} = require('../controllers/userControllers')


userRouter.get("", getAllUsers)
userRouter.get("/stats", getUserStats)
userRouter.post("/login", loginUser)
userRouter.post("/signup", signupUser)

module.exports = userRouter