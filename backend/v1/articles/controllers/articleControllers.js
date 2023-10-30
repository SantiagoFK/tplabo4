const Article = require('../models/article')

const getArticles = async (req, res) => {
    try
    {
        const articles = await Article.find({})
        return res.status(200).json({ articles: articles })
    }catch(error)
    {
        console.log(error)
    }

    return res.status(500).json({ error: "Server error: Something happenned while fetching articles. "})
}

const postArticle = async (req, res) => 
{
    const { title, author, body, created, updated } = req.body

    if( title && author && body )
    {
        try
        {
            const article = new Article({
                title: title,
                author: author,
                body: body
            })

            await Article.create(article)
            

            return res.status(201).json({ msg: "New article was successfully created."})
        }catch(error)
        {
            console.log(error)
        }

    }
    else if ( !title || !author  || !body)
    {
        return res.status(400).json({ error: "Cannot create article: missing title, author or body."})
    }

    return res.status(400).json({ error: "No article was received as the body of the request."})

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