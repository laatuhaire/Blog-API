require('dotenv').config();
const connectDB = require('./src/config/connectDB.js');
const app = require('./src/index.js');

const PORT = process.env.PORT || 4007;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
