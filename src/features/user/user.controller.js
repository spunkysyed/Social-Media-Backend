import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import ApplicationError from "../../Error-Handler/errorHandler.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    try {
      const { name, email, password,gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = {
        name,
        email,
        password: hashedPassword,
        gender,
      };
      const newUser = await this.userRepository.addUser(user)
      
      if (newUser) {
        res.status(201).send("Account Created Successfully");
      } else {
        res.status(400).send("Account Not Created");
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong. Please try later.",500)
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        res.status(400).send("User Not Found");
      }
      const isValid = bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign(
          { userID: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        user.tokens.push(token);
        await user.save();
        res.status(200).send(token+"User login successful");
      } else {
        res.status(400).send("Incrorrect Credentials");
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong. Please try later.",500)
    }
  }

  async logOut(req,res){
    const userId=req.userID;
    const token=req.headers.authorization
    await this.userRepository.logout(userId,token);
    res.status(200).send("Logout SuccessFull")
  }

  async logOutAllDevices(req,res){
    const userId=req.userID;
    await this.userRepository.logoutAll(userId);
    res.status(200).send("Logout From All Devices Successfull")
  }

  async getUserDetails(req,res){
    const userId=req.params.userId;
    const userDetails=await this.userRepository.userDetails(userId);
    if(userDetails){
        res.status(200).send(userDetails);
    }
    else{
        res.status(400).send("User Details Not Found")
    }
  }

  async getAllUsersDetails(req,res){
    const users=await this.userRepository.getAllDetails();
    if(users){
      res.status(200).send(users);
    }
    else{
      res.status(404).send("No Users Found");
    }
    
  }

  async updateUserDetails(req,res){
    const userId=req.params.userId;
    const {name,email,gender}=req.body;
    await this.userRepository.updateDetail(userId,{name,email,gender});
    res.status(200).send("Update Successfully");
  }
}
