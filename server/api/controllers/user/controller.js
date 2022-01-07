import authenticationService from "../../services/authentication.service";
import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";

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
  async addAddress(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      console.log(req.body);
      if (decoded.id) {
        const address = await AuthService.addAddress(decoded.id, req.body);
        return res.send("Address added successfully");
      } else {
        res.status(401).end();
      }
    } catch (err) {
      next(err);
    }
  }
  async addToCart(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const cart = await userService.addToCart(decoded.id, req.body);
        return res.send(cart._id);
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (err) {
      next(err);
    }
  }
  async getCart(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const carts = await userService.getCart(decoded.id);
        return res.send(carts);
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (err) {
      next(err);
    }
  }
  async removeFromCart(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const cart = await userService.removeFromCart(decoded.id, req.body);
        if (cart) {
          return res.send("Cart removed successfully");
        } else {
          return res.send("Cart not found");
        }
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (err) {
      next(err);
    }
  }
  async becomeASeller(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);

      if (decoded.id) {
        const seller = AuthService.createSeller(decoded.id, req.body);
        return res.send("Seller added successfully");
      } else {
        res.status(401).end();
      }
    } catch (err) {
      next(err);
    }
  }
  async addToWishList(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const wishlist = await userService.addToWishList(decoded.id, req.body);
        return res.send("Wishlist added successfully");
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (err) {
      next(err);
    }
  }
  async removeFromWishlist(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const wishlist = await userService.removeWishlist(
          decoded.id,
          req.body.product_id
        );
        res.status(200).send("Removed Succesfully!");
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (err) {
      next(err);
    }
  }
  async getWishList(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const wishlist = await userService.getWishlist(decoded.id);
        return res.send(wishlist);
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (err) {
      next(err);
    }
  }
  async moveToWishList(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const wishlist = await userService.moveTowishlist(decoded.id, req.body);
        return res.send(wishlist);
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (err) {
      next(err);
    }
  }
}
export default new Controller();
