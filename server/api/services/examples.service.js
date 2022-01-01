import l from "../../common/logger";
// import db from "./examples.db.service";
import connects, { User } from "../../common/mongo";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
class ExamplesService {
  // all() {
  //   l.info(`${this.constructor.name}.all()`);
  //   return db.all();
  // }

  // byId(id) {
  //   l.info(`${this.constructor.name}.byId(${id})`);
  //   return db.byId(id);
  // }

  // create(name) {
  //   return db.insert(name);
  // }

  async getUser(uid) {
    const decode = await jwt.verify(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2VhZWExY2NjZGNkMmVjZTIzN2E5YSIsImlhdCI6MTY0MDkzNTA3M30.F_xR8wc-2ifuGaY7bWII5lte7n20LFhaj5N28e9G2d0",
      process.env.JWT_SECRET
    );
    console.log(decode);
    console.log(User.findById);
    const user = await User.findById(decode.id);
    console.log(user);
    if (user) {
      delete user.password;
      delete user._id;
      return user;
    }
  }
}

export default new ExamplesService();
