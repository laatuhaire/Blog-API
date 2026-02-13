const Joi = require('joi');
const ArticleModel = require('../models/article.model');

// CREATE ARTICLE


// CREATE ARTICLE
const postArticle = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(20).required(),
        author: Joi.string().optional().default('Guest'),
    });

    const value = req.body; 
    const { error } = schema.validate(value);

    if (error) {
        return res.status(400).json('Please provide article title and content');
    }

    try {
        // Attach logged-in user's ID here
        const newArticle = new ArticleModel({
            ...value,
            userId: req.user.userId,  // userId from auth middleware
        });
        await newArticle.save();

        return res.status(201).json({
            message: 'Article created successfully',
            data: newArticle,
        });
    } catch (error) {
        next(error);
    }
};


// GET ALL ARTICLES
const getAllArticles = async (req, res, next) => {
    const { limit = 10, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    try {
        const articles = await ArticleModel.find({})
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip(Number(skip));

        return res.status(200).json({
            message: 'Articles fetched successfully',
            data: articles,
        });
    } catch (error) {
        next(error);
    }
};

// GET ARTICLE BY ID
const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: `Article with ${req.params.id} not found`,
            });
        }

        return res.status(200).json({
            message: 'Article fetched successfully',
            data: article,
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE ARTICLE
const updateArticleById = async (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(20).optional(),
        author: Joi.string().optional(),
    });

    const value = req.body; 
    const { error } = schema.validate(value);

    if (error) {
        return res.status(400).json('Please provide article title and content');
    }

    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            value,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedArticle) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }

        return res.status(200).json({
            message: 'Article updated successfully',
            data: updatedArticle,
        });
    } catch (error) {
        next(error);
    }
};



// DELETE ARTICLE
const deleteArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({
                message: 'Article not found',
            });
        }

        return res.status(200).json({
            message: 'Article deleted',
        });
    } catch (error) {
        const NativeError = error; 
        next(NativeError);
    }
};

// SEARCH ARTICLES BY KEYWORD 
const searchArticles = async (req, res, next) => {
    const { keyword } = req.query; 
    if (!keyword) {
        return res.status(400).json({
            message: 'Please provide a search keyword'
        });
    }

    try {
        // Use case-insensitive search on title or content
        const articles = await ArticleModel.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { content: { $regex: keyword, $options: 'i' } }
            ]
        });

        if (!articles.length) {
            return res.status(404).json({
                message: `No articles found matching "${keyword}"`
            });
        }

        return res.status(200).json({
            message: 'Search results',
            data: articles
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    postArticle,
    getArticleById,
    getAllArticles,
    updateArticleById,
    deleteArticleById,
    searchArticles,
};
