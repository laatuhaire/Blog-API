const express = require('express');
const router = express.Router();

const ArticleModel = require('../models/article.model');
const { 
    postArticle, 
    getAllArticles, 
    getArticleById, 
    updateArticleById, 
    deleteArticleById,
    searchArticles
} = require('../controllers/article.controller.js');

const { 
    validateArticle,
    validateUpdatedArticle
} = require('../validations/post.validations.js');

const { requireAuth, requireOwnership } = require('../middlewares/auth.middleware');

// CREATE ARTICLE
router.post('/articles', requireAuth, validateArticle, postArticle);

// GET ALL ARTICLES
router.get('/articles', requireAuth, getAllArticles);

// SEARCH ARTICLES
router.get('/articles/search', requireAuth, searchArticles);

// GET ARTICLE BY ID
router.get('/articles/:id', requireAuth, getArticleById);

// UPDATE ARTICLE
router.put(
    '/articles/:id', 
    requireAuth, 
    requireOwnership(ArticleModel), 
    validateUpdatedArticle, 
    updateArticleById
);

// DELETE ARTICLE
router.delete(
    '/articles/:id', 
    requireAuth, 
    requireOwnership(ArticleModel), 
    deleteArticleById
);

module.exports = router;
