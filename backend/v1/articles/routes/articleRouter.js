const express = require('express')
const {
    getArticles,
    postArticle,
    deleteArticle,
    updateArticle
} = require('../controllers/articleControllers')

const articleRouter = express.Router()

articleRouter.get("/", getArticles)
articleRouter.post("/", postArticle)
articleRouter.delete("/", deleteArticle)
articleRouter.patch("/", updateArticle)

module.exports = articleRouter