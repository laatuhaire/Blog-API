const mongoose = require('mongoose'); 

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5,
        },
        content: {
            type: String,
            required: true,
            minlength: 20,
        },
        author: {
            type: String,
            default: 'Guest',
        },
        userId: {                       // << Added userId field
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
