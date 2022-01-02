import res from "express/lib/response";
import l from "../../common/logger";
import  { User } from "../../common/mongo";
import authenticationService from "./authentication.service";
class AuthService {
  async getUserbyEmail(email) {
    let user = await User.findOne({email: email});
    if (user) {
        return user;
    }
  }
  async getUser(uid) {
   let user = await User.findById(uid);
    
   if (user) {
        return user;
    }
  }
  async createUser(user) {
    const newUser = {
      name : user.name,
      mobile : user.mobile,
      email: user.email,
      password: await authenticationService.encryptPassword(user.password),

    }
    await User.create(newUser,(err,user)=>{ 
    return user;  
   });
   
  }
}

export default new AuthService();
