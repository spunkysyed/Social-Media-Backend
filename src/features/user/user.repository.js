import ApplicationError from '../../Error-Handler/errorHandler.js'
import UserModel from "./user.schema.js";

export default class UserRepository {

  // Registering a user
  async addUser(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  // Find the user using email

  async findUserByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  // logout 
  async logout(userId, token) {
    try {
      const user = await UserModel.findById(userId);
      user.tokens = user.tokens.filter((t) => t !== token);
      await user.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  // Logging out from all devices
  async logoutAll(userId) {
    try {
      const user = await UserModel.findById(userId);
      user.tokens = [];
      await user.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  // get a particular users detail
  async userDetails(userId) {
    try {
      const user = await UserModel.findById(userId, { tokens: 0, password: 0 });
      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  // Getting all users Details

  async getAllDetails() {
    try {
      const users = await UserModel.find({}, { tokens: 0, password: 0 });
      return users;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  // Update Users Details Except Password
  async updateDetail(userId, userDetails) {
    try {
      const updatedUser = await UserModel.updateOne(
        { _id: userId },
        {
          $set: {
            name: userDetails.name,
            email: userDetails.email,
            gender: userDetails.gender,
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }

  // Updating password of a user
  async updatePassword(userId, email, password) {
    try {
      const update = await UserModel.findOneAndUpdate(
        { _id: userId, email },
        {
          $set: {
            password,
          },
        }
      );
      if (update) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong",500)
    }
  }
}
