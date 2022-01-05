import productService from "../../services/product.service";
import authenticationService from  "../../services/authentication.service";
export class Controller {
  async addProduct(req, res, next) {
    try{
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await authenticationService.verifyToken(token);
      if(decoded.id){
        const product = await productService.createProduct(decoded.id, req.body);
        res.status(200).json(product._id);
      }
      else{
        res.status(401).json({message: "Unauthorized"});
      }
    }
    catch(err){
      next(err);
    }
  }
  async addReview(req,res,next){
    try{
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await authenticationService.verifyToken(token);
      if(decoded.id){
        const review = await productService.addReview(decoded.id, req.body);
        res.status(200).json(review._id);
      }
      else{
        res.status(401).json({message: "Unauthorized"});
      }
    }
    catch(err){
      next(err);
    }
   
  }
  async getReview(req,res,next){

  const review = await productService.getReview(decoded.id);
  res.status(200).json(review); 
  }
}
export default new Controller();
