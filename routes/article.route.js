const express = require('express');

const {
    postArticle,
    getAllArticles,
    getArticleById,
    updateArticleById,
    deleteArticleById,
} = require('../controllers/article.controller.js');

const router = express.Router();

// FIX: avoid double /articles
router.post('/', postArticle);
router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.put('/:id', updateArticleById);
router.delete('/:id', deleteArticleById);

module.exports = router;
