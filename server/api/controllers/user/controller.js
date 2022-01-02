import authenticationService from "../../services/authentication.service";
import AuthService from "../../services/auth.service";

export class Controller {
  async getUserDetails(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const user = await AuthService.getUser(decoded.id);
        return res.status(200).json(user);
      } else {
        res.status(401).end();
      }
    } catch (err) {
      next(err);
    }
  }
}
export default new Controller();
