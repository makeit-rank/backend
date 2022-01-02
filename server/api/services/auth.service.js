import User from "../../models/User";
import authenticationService from "./authentication.service";
import {ObjectId} from 'mongodb'
import Seller from "../../models/Seller";
class AuthService {
  async getUserbyEmail(email) {
    let user = await User.findOne({ email: email });
    if (user) {
      return user;
    }
  }
  async getUser(uid) {
    let user = await User.findById(uid, { _id: 0, __v: 0 });
    user.password = undefined;
    user._doc["_id"] = undefined;

    if (user) {
      return user;
    }
  }
  async createUser(user) {
    const newUser = {
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      password: await authenticationService.encryptPassword(user.password),
    };
    return await User.create(newUser);
  }
  async createSeller(uid, body) {
    const seller = {
      user_id: uid,
      shop_name : body.shop_name,
      gst_id: body.gst_id,
      pickup_address: body.pickup_address,
    }
    await Seller.create(seller);
    User.findByIdAndUpdate(uid, { $set: { role: "seller" } });
    return;
  }
  async addAddress(uid, address) {
     const user = await User.findById(uid);
     user.address.push(address);
     await user.save();
     console.log(user)
     return;
   
  }
}
export default new AuthService();
