const express = require('express')
const userRouter = express.Router()

const {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userControllers')

userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)

//los siguientes endpoints deben recibir el id 
userRouter.get("/", getUser)
userRouter.put("/", updateUser)
userRouter.delete("/", deleteUser)

module.exports = userRouter