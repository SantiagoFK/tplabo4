const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const SALT_FACTOR = 10

const userSquema = mongoose.Squema({
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    username: { type: String, required: true },
    created: { type: Date, default: Date.now }
})

//metodos del documento user
userSquema.methods.signup = async (email, password, username) => {
    if( !email || !password || !username )
    {
        throw new Error('All fields must be filled.')
    }

    if( ! validator.isEmail(email) )
    {
        throw new Error('Email is not valid.')
    }

    const emailExists = await this.findOne({ email: email })

    if( emailExists )
    {
        throw new Error('Email already in use. Try logging in.')
    }

    const usernameExists = await this.findOne({ username: username })

    if( usernameExists )
    {
        throw new Error('Username already in use.')
    }

    const salt = bcrypt.genSalt(SALT_FACTOR)
    const hashPass = bcrypt.hash(password, salt)
    const user = await this.create({ email: email, password: hashPass, username: username })
    return user
}

userSquema.methods.login = async (email, password) => {
    if( !email || !password )
    {
        throw new Error('All fields must be filled.')
    }

    const user = await this.findOne({ email: email })

    if( ! user )
    {
        throw new Error('No user with such email.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if( ! passwordMatch )
    {
        throw new Error('Incorrect password.')
    }

    return user
}



module.exports = mongoose.model('User', userSquema)