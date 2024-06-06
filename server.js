// Libraries
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express'

// Mongodb Connection Using mongoose
import { connectUsingMongoose } from './src/config/mongooseConfig.js';

// Middlewares
import jwtAuth from './src/middlewares/jwt.middleware.js';
import { loggerMiddleware } from './src/middlewares/logger.middleware.js';
import { invalidRouteMiddleware } from './src/middlewares/invalidRoutePath.middleware.js';

// Error Handler
import ApplicationError from './src/Error-Handler/errorHandler.js';

// Router Files
import UserRouter from './src/features/user/user.routes.js';
import PostRouter from './src/features/post/post.routes.js';
import CommentRouter from './src/features/comment/comment.route.js';
import LikeRouter from './src/features/like/like.route.js';
import FriendRouter from './src/features/friendship/friendship.route.js';
import OtpRouter from './src/features/otp/otp.routes.js';

// Swagger Api Documentation
import apiDocs from './swagger.json' assert{type:'json'}

// creating Server
const server=express();

// Cors Configuration
var corsOptions={
    origin:'http://localhost:4000'
}
server.use(cors(corsOptions));

// Route For logging Api request
server.use(loggerMiddleware);

// For parsing json in body
server.use(bodyParser.json());

// UserRoute
server.use('/api/users',UserRouter);
// PostRoute
server.use('/api/posts',jwtAuth,PostRouter);
// CommentRoute
server.use('/api/comments',jwtAuth,CommentRouter);
// LikeRoute
server.use('/api/likes',jwtAuth,LikeRouter);
// FriendshipRoute
server.use('/api/friends',jwtAuth,FriendRouter);
// OtpRoute
server.use('/api/otp',OtpRouter);

// API Documentation
server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));

//error handler
server.use((err,req,res,next)=>{
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    else{
        res.status(500).send("Something went wrong please check out documentation at http://localhost:8000/api-docs/");
    }
})

// middleware to handle all Invalid API Calls
server.use(invalidRouteMiddleware);

// For Starting The Server
server.listen(4000,()=>{
    console.log("Server is Running at port 4000")
    connectUsingMongoose();
})