const joi = require('joi');
const Article = require('../models/article.model');


const postArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body);
        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        next(error);
    }   
};

const getArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.id);  
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }           
        res.status(200).json(article);
    }   catch (error) {
        next(error);
    }   

};

const getAllArticles = async (req, res, next) => {
    try {
        const articles = await Article.find();  
        res.status(200).json(articles);
    }
    catch (error) {
        next(error);
    }   
};
 
const updateArticle = async (req, res, next) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        next(error);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postArticle,
    getArticle,
    getAllArticles,
    updateArticle,
    deleteArticle,
};



