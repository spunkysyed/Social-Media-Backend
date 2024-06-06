import express from 'express'

import jwtAuth from '../../middlewares/jwt.middleware.js'
import UserController from './user.controller.js';

const UserRouter =express.Router();
const userController=new UserController();

UserRouter.post('/signup',(req,res)=>{
       userController.signUp(req,res);
});

UserRouter.post('/signin',(req,res)=>{
    userController.signIn(req,res);
})

UserRouter.get('/logout',jwtAuth,(req,res)=>{
    userController.logOut(req,res);
})

UserRouter.get('/logout-all-devices',jwtAuth,(req,res)=>{
    userController.logOutAllDevices(req,res);
})

UserRouter.get('/get-details/:userId',jwtAuth,(req,res)=>{
    userController.getUserDetails(req,res);
})

UserRouter.get('/get-all-details',jwtAuth,(req,res)=>{
    userController.getAllUsersDetails(req,res);
})

UserRouter.put('/update-details/:userId',jwtAuth,(req,res)=>{
    userController.updateUserDetails(req,res);
})


export default UserRouter 