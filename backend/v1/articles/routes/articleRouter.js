const express = require('express')
const {
    getArticles,
    getArticleById,
    postArticle,
    deleteArticle,
    updateArticle
} = require('../controllers/articleControllers')

const articleRouter = express.Router()

articleRouter.get("/", getArticles)
articleRouter.get("/:id", getArticleById)
articleRouter.post("/", postArticle)
articleRouter.delete("/:id", deleteArticle)
articleRouter.patch("/:id", updateArticle)

module.exports = articleRouter