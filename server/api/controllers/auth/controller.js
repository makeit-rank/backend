import authenticationService from "../../services/authentication.service";
import AuthService from "../../services/auth.service";

export class Controller {
  async signup(req, res, next) {
    try {
      const user = await AuthService.getUserbyEmail(req.body.email);
      if (user) {
        res.status(409).send("User already exists");
        return;
      }
      const newUser = await AuthService.createUser(req.body);
      const token = authenticationService.generateToken(newUser._id);
      res.status(201).send(token);
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }
  async login(req, res, next) {
    const user = await AuthService.getUserbyEmail(req.body.email);
    if (user) {
      const isValid = await authenticationService.comparePassword(
        req.body.password,
        user.password
      );
      if (isValid) {
        const token = authenticationService.generateToken(user._id);
        res.status(200).send(token);
        return;
      } else {
        res.status(401).send("Your password is incorrect");
        return;
      }
    } else {
      res.status(401).send("User not found");
      return;
    }
  }
  async getUserDetails(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const user = await AuthService.getUser(decoded.id).then((r) => {
          r.password = undefined;
          r._id = undefined;
          res.status(200).json(r);
          return r;
        });
      } else {
        res.status(401).end();
      }
    } catch (err) {
      next(err);
    }
  }
}
export default new Controller();
