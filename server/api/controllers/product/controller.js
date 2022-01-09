import productService from "../../services/product.service";
import authenticationService from "../../services/authentication.service";
export class Controller {
  async addProduct(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const product = await productService.createProduct(
          decoded.id,
          req.body
        );
        res.status(200).json(product._id);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      next(err);
    }
  }
  async addReview(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const review = await productService.addReview(decoded.id, req.body);
        res.status(200).json(review._id);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      next(err);
    }
  }
  async getReview(req, res, next) {
    const review = await productService.getReview(decoded.id);
    res.status(200).json(review);
  }
  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.body.product_id);
      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  async getTopPicks(req, res, next) {
    try {
      const topPicks = await productService.getTopPicks(req.body?.limit);
      return res.status(200).json(topPicks);
    } catch (err) {
      next(err);
    }
  }
  async getProductSeller(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded.id) {
        const products = await productService.getProductSellerid(decoded.id);
        return res.status(200).json(products);
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (err) {
      next(err);
    }
  }
  async searchProduct(req, res, next) {
    const products = await productService.searchProduct(req.body.query);
    return res.status(200).json(products);
  }
}
export default new Controller();
