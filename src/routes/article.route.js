const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth.js');

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

const { requireOwnership } = require('../middlewares/auth.middleware');

router.use(requireAuth);

// CREATE ARTICLE
router.post('/articles', validateArticle, postArticle);

// GET ALL ARTICLES
router.get('/articles', getAllArticles);

// SEARCH ARTICLES
router.get('/articles/search', searchArticles);

// GET ARTICLE BY ID
router.get('/articles/:id', getArticleById);

// UPDATE ARTICLE
router.put(
    '/articles/:id',   
    requireOwnership(ArticleModel), 
    validateUpdatedArticle, 
    updateArticleById
);

// DELETE ARTICLE
router.delete(
    '/articles/:id',  
    requireOwnership(ArticleModel), 
    deleteArticleById
);

module.exports = router;
