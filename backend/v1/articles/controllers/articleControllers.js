const Article = require('../models/article')
const mongoose = require('mongoose')

const getArticles = async (req, res) => {
    try
    {
        const articles = await Article.find({})
        return res.status(200).json(articles)
    }catch(error)
    {
        console.log(error)
    }

    return res.status(500).json({ error: "Server error: Something happenned while fetching articles. "})
}

const getArticleById = async (req, res) => {
    const { id } = req.params

    if( id )
    {
        if( mongoose.Types.ObjectId.isValid(id) )
        {
            try
            {
                const article = await Article.findById(id)
    
                if ( ! article  )
                {
                    return res.status(400).json({ error: `No article was found with id ${id}`})
                }

                return res.status(200).json(article) 
    
            }catch(error)
            {
                console.log(error)
            }
        }else
        {
            return res.status(400).json({ error: `Invalid ID ${id}.`})
        }

    }

    return res.status(400).json({ error: "No ID was given as url parameter."})
}

const postArticle = async (req, res) => {
    const { title, author, body, created, updated } = req.body

    if( title && author && body )
    {
        try
        {
            //se puede mejorar con spread operator
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

    return res.status(400).json({ error: "No article was given in the body of the request."})

}

const deleteArticle = async (req, res) => {
    const { id } = req.params

    if( id )
    {
        if( mongoose.Types.ObjectId.isValid(id) )
        {
            try
            {
                const { deletedCount } = await Article.deleteOne({ _id: id })
    
                if ( deletedCount !== 1 )
                {
                    return res.status(400).json({ error: `No article was found with id ${id}`})
                }

                return res.status(200).json( { msg: `Article with id ${id} sucessfully deleted.`} )
    
            }catch(error)
            {
                console.log(error)
            }
        }else
        {
            return res.status(400).json({ error: `Invalid ID ${id}.`})
        }

    }

    return res.status(400).json({ error: "No ID was given as url parameter."})
}

const updateArticle = async (req, res) => {
    const { id } = req.params

    if( id )
    {
        if( mongoose.Types.ObjectId.isValid(id) )
        {
            try{
                const article = await Article.findByIdAndUpdate({ _id: id}, {...req.body})

                if( ! article )
                {
                    return res.status(404).json({ error: `No such article with id ${id} was found` })
                }
                
                return res.status(200).json({ msg: `Article with ${id} sucessfully updated.`})
            }catch(error)
            {
                console.log(error)
            }
        }
        else
        {
            return res.status(400).json({ error: `Invalid ID ${id}.`})
        }
    }

    return res.status(400).json({ error: "No ID was given as url parameter."})
}

const getArticleStats = async (req, res) => {
    try
    {
        //count articles
        const articleCount = await Article.find().count()

        //sum all upvotes in all articles with aggregate function sum()
        const query = await Article.aggregate([{
            $group: {
                _id: null, 
                upvotesCount:{$sum: "$upvotes"},
                adsvotesCount:{$sum: "$adsvotes"}
            }
        }])
        const { upvotesCount, adsvotesCount } = query[0]

        return res.status(200).json({
            articleCount: articleCount,
            upvotesCount: upvotesCount,
            adsvotesCount: adsvotesCount
        })
    }catch(error)
    {
        console.log(error)
    }

    return res.status(500).json({ error: "Server error: Something happenned while fetching articles. "})
}

module.exports = {
    getArticles,
    getArticleStats,
    getArticleById,
    postArticle,
    deleteArticle,
    updateArticle,
}