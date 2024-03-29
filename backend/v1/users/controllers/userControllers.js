const User = require('../models/user')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')
const SALT_FACTOR = 10

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d'})
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if( !email || !password )
    {
        return res.status(400).json({ error: "All fields must be filled. "})
    }

    if( ! validator.isEmail(email) )
    {
        return res.status(400).json({ error: "Email is not valid."})
    }

    try
    {
        const user = await User.findOne({ email: email })
        
        if( ! user )
        {
            return res.status(404).json({ error: "No user found with such email, try signing up."})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if( ! passwordMatch )
        {
            return res.status(400).json({ error: "Invalid password."})
        }

        const token = createToken(user._id)
        const username = user.username

        return res.status(200).json({email, token, username})
        
    }catch(error)
    {
        console.log(error)
    }

    return res.status(500).json({error: "Server error: Something happenned while logging in. "})
}

const signupUser = async (req, res) => {
    const { email, password, username } = req.body

    if( !email || !password || !username )
    {
        return res.status(400).json({ error: "All fields must be filled. "})
    }

    if( ! validator.isEmail(email) )
    {
        return res.status(400).json({ error: "Email is not valid."})
    }

    const emailExists = await User.findOne({ email: email })
    const usernameExists = await User.findOne({ username: username})

    if( emailExists )
    {
        return res.status(400).json({ error: "Email already in use. Try logging in."})
    }

    if( usernameExists )
    {
        return res.status(400).json({ error: "Username already in use. Try logging in."})
    }

    const salt = bcrypt.genSaltSync(SALT_FACTOR)
    const hashPass = bcrypt.hashSync(password, salt)

    try{
        const user = await User.create({ 
            email: email, 
            password: hashPass, 
            username: username
        })

        const token = createToken(user._id)
        return res.status(201).json({email, token, username})
    }catch(error)
    {
        console.log(error)
    }

    return res.status(500).json({error: "Server error: Something happenned while creating an user. "})
}

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find({})
        return res.status(200).json(users)
    }catch(error)
    {
        console.log(error)
    }

    return res.status(500).json({ error: "Server error: Something happenned while fetching articles. "})
}

const getUserStats = async (req, res) => {
    try
    {
        const userCount = await User.find().count()
        return res.status(200).json({userCount: userCount})
    }catch(error)
    {
        console.log(error)
    }

    return res.status(500).json({ error: "Server error: Something happenned while fetching articles. "})
}

module.exports = {
    loginUser,
    signupUser,
    getUserStats,
    getAllUsers
}
