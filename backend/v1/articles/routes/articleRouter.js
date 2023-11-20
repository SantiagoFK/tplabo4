const express = require('express')
const {
    getArticles,
    getArticleStats,
    getADS,
    getArticleById,
    postArticle,
    deleteArticle,
    updateArticle
} = require('../controllers/articleControllers')

const articleRouter = express.Router()

articleRouter.get("/", getArticles)
articleRouter.get("/stats", getArticleStats)
articleRouter.get("/ads", getADS)
articleRouter.get("/:id", getArticleById)
articleRouter.post("/", postArticle)
articleRouter.delete("/:id", deleteArticle)
articleRouter.patch("/:id", updateArticle)

module.exports = articleRouter