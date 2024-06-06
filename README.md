# Social Media Backend

This is a simple RESTful API built with Express.js for handling user authentication, posts, comments, likes, friendships, and OTP functionality. It includes models, controllers, middleware, and routes to manage various features, providing basic CRUD operations and authentication functionalities.

## Features

- **User Authentication**: User registration and login with hashed passwords.
- **Post Management**: CRUD operations for posts.
- **Comment Management**: CRUD operations for comments on posts.
- **Like Management**: Ability to like and unlike posts.
- **Friendship Management**: Manage friendships between users.
- **OTP Management**: OTP generation and verification for password reset.
- **Middleware**: Custom error handling, file uploads, token-based authentication, and request logging.

## Dependencies

- `express`: Web framework for Node.js
- `bcryptjs`: Library for hashing passwords
- `jsonwebtoken`: Library for creating and verifying JSON Web Tokens
- `multer`: Middleware for handling multipart/form-data (file uploads)
- `winston`: Logger middleware for Node.js
- `mongoose`: MongoDB object modeling tool
- `swagger-ui-express`: Middleware for Swagger API documentation

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
2. Install the dependencies: npm i
3. Create a .env file in the root directory and add the following environment variables:
       - DB_URL=mongodb://localhost:27017
       - JWT_SECRET=your_jwt_secret
       - EMAIL=email from ehcich otp will be sent
       - PASSWORD=email password
4. Start the server: npm start


The server will start running on the specified port (default is 4000). You can now make requests to the API endpoints.

##Middleware

#Error Handling Middleware
Custom error handling middleware that sends custom error messages.

#File Upload Middleware
Handles media uploads for posts using Multer.

#Token-Based Authentication Middleware
Secures routes by verifying JSON Web Tokens.

#Logger Middleware
Logs request URL and body for all routes using Winston.

##Database Connection
The application uses Mongoose to connect to a MongoDB database. The connection configuration can be found in the src/config/db.js file.

##API Documentation
The API documentation is available at http://localhost:3000/api-docs using Swagger UI.
