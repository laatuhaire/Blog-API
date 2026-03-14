# BLOG API
A RESTful Blog API built with Node.js, Express, and MongoDB.
This API allows users to register, authenticate, and create or manage blog articles.
The project demonstrates backend concepts such as authentication, middleware, validation, file uploads, and error handling.

LIVE ON RENDER ---https://blog-api-2-2k6d.onrender.com

Features
User registration and login
Secure authentication with JWT tokens
Create blog articles
Retrieve all articles with pagination
Retrieve a single article
Update articles
Delete articles
Search articles by keyword
Image upload support
Request logging middleware
Centralized error handling

--Tech Stack
Node.js
Express.js
MongoDB
JWT Authentication
Joi Validation
Multer (file uploads)
Bcrypt (password hashing)

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
API Endpoints
Authentication
Register User
POST /api/users/signup
Example request body
{
 "name": "John Doe",
 "email": "john@example.com",
 "password": "password123"
}

Login User
POST /api/users/login
Example request body
{
 "email": "john@example.com",
 "password": "password123"
}

Response
{
 "message": "Login successful",
 "user": {
   "id": "...",
   "name": "John Doe",
   "email": "john@example.com"
 },
 "token": "JWT_TOKEN"
}

Article Endpoints
Create Article (Protected)
POST /api/articles
Header
Authorization: Bearer TOKEN
Example body
{
 "title": "My First Blog",
 "content": "This is the content of my first article",
 "author": "John Doe"
}

Get All Articles
GET /api/articles
Supports pagination
Example
/api/articles?page=1&limit=10

Get Article by ID
GET /api/articles/

Update Article
PUT /api/articles/

Delete Article
DELETE /api/articles/

Search Articles
GET /api/articles/search?keyword=node
Returns articles that match the keyword in title or content.

File Upload
Upload image
POST /api/users/upload
Form-data
image : file
Handled using Multer middleware.



////Authentication
Protected routes require a JWT token.
Example header:
Authorization: Bearer YOUR_TOKEN

///////////Testing
All endpoints were tested using Postman.

Example tests include:
User signup
User login
Creating blog articles
Searching articles
Updating articles
Deleting articles

AUTHOR: ATUHAIRE LUCKY ABIGAIL
        BACKEND WEB DEVELOPMENT
