require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectDB.js');
const RequestLogger = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');

const ArticleRoutes = require('./routes/article.route.js');
const  UserRoutes = require('./routes/user.route.js');

const app = express();

const PORT = process.env.PORT || 4007;

connectDB();

app.use(express.json());

app.use(cors());

app.use(RequestLogger);

app.use('/api', ArticleRoutes);
app.use('/api/users', UserRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API IS RUNNING SUCCESSFULLY for the Article API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
