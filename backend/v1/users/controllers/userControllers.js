const getAllUsers = (req, res) => {
    res.end("get all users")
}

//por id
const getUser = (req, res) => {
    res.end("get single user")
}

const createUser = (req, res) => {
    res.end("create user")
}

const updateUser = (req, res) => {
    res.end("update user")
}

const deleteUser = (req, res) => {
    res.end("delete user")
}

module.exports = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}
