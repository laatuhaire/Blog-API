# BLOG API
A RESTful Blog API built with Node.js, Express, and MongoDB.
This API allows users to register, authenticate, and create or manage blog articles.
The project demonstrates backend concepts such as authentication, middleware, validation, file uploads, and error handling.

LIVE ON RENDER ---
TESTED USING POSTMAN ---


Features
User registration and login
JWT authentication and protected routes
Create, read, update, and delete blog posts
Image upload support using Cloudinary
Input validation for users and posts
Logging middleware
Centralized error handling
Modular project structure


blog-api/
│
├── .env
|__.envexample
├── .gitignore
├── package.json
├── package-lock.json
│
└── src
    │
    ├── app.js
    ├── index.js
    ├── classCode.js
    |__uploads
    │
    ├── config
    │   ├── connectDB.js
    │   └── cloudinary.js
    │
    ├── controllers
    │   ├── article.controller.js
    │   └── user.controller.js
    │
    ├── middleware
    │   ├── auth.middleware.js
    │   ├── requireAuth.js
    │   ├── upload.js
    │   ├── errorHandler.js
    │   └── logger.js
    │
    ├── models
    │   ├── article.model.js
    │   └── user.model.js
    │
    ├── routes
    │   ├── article.routes.js
    │   └── user.routes.js
    │
    ├── utils
    │   ├── jwt.js
    │   └── bcrypt.js
    │
    └── validations
        ├── postValidation.js
        └── userValidation.js


     //   What each folder does

config
connectDB.js → connects to MongoDB
cloudinary.js → image storage config

controllers
business logic for users and articles

middleware
authentication
logging
error handling
file uploads

utils
reusable helper functions
bcrypt.js → password hashing
jwt.js → token generation

validations
request validation (signup, post creation)

///////Install dependencies
npm install 

/////////Environment Variables
Create a .env file in the root directory.
Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

/////Running the Server
Development mode
npm run dev
Server will run on
http://localhost:PORT
MONGO DB CONNECTED


////////API Endpoints
Authentication
Register a new user
POST /api/users/signup
Login user
POST /api/users/login
Articles
Get all articles
GET /api/articles
Get a single article
GET /api/articles/:id
Create an article (Protected)
POST /api/articles
Update an article (Protected)
PUT /api/articles/:id
Delete an article (Protected)
DELETE /api/articles/:id

////Authentication
Protected routes require a JWT token.
Example header:
Authorization: Bearer YOUR_TOKEN

///////////Testing
All endpoints were tested using Postman.
Example tests include:
User signup
User login
Creating blog posts
Retrieving articles
Updating articles
Deleting articles

AUTHOR: ATUHAIRE LUCKY ABIGAIL
        BACKEND WEB DEVELOPMENT
