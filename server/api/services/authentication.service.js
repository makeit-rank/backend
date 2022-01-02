import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
class AuthenticationService {
  /**
   * Generate the JWT Token for the user
   * @param {String} id - ID of the user
   */
    async encryptPassword(password){
    return  await bcrypt.genSalt(10)
    .then((salt => bcrypt.hash(password, salt)))
    .then(hash => hash)
   }
   async comparePassword(password , hashedpassword){
     return await bcrypt.compare(password, hashedpassword)
    .then(result => result)
    .catch(err => err)
   }
   async verifyToken(token) {
     return await jwt.verify(token, process.env.JWT_SECRET)
   }
  generateToken(id) {
    return jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET
    );
  }
}

export default new AuthenticationService();