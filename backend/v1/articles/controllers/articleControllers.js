const articles = [{
    "id": 1,
    "title": "Saying Hi",
    "author": "Marian",
    "body": "Hello this is my first article"
},
{
    "id": 2,
    "title": "Start on C",
    "author": "Professor X",
    "body": "This is the way to start on C programming language"
},
{
    "id": 3,
    "title": "How to think of the right data structure",
    "author": "Fred",
    "body": "Thinking about the right data structure"
}]

const getArticles = (req, res) => {
    return res.status(200).json(articles)
}

const postArticle = (req, res) => {
    return res.status(200).json({"post": "create an article"})
}

const deleteArticle = (req, res) => {
    res.send("delete an article")
}

const updateArticle = (req, res) => {
    res.send("update an article")
}

module.exports = {
    getArticles,
    postArticle,
    deleteArticle,
    updateArticle
}