const express = require('express');

const { 
    postArticle, 
    getAllArticles, 
    getArticleById, 
    updateArticleById, 
    deleteArticleById,
    searchArticles // bonus
} = require('../controllers/article.controller.js');

const router = express.Router();

// CREATE
router.post('/articles', postArticle);

// GET ALL
router.get('/articles', getAllArticles);

// SEARCH
router.get('/articles/search', searchArticles);

// GET BY ID
router.get('/articles/:id', getArticleById);

// UPDATE
router.put('/articles/:id', updateArticleById);

// DELETE
router.delete('/articles/:id', deleteArticleById);

module.exports = router;
