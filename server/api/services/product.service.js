import Product from "../../models/Product";
import Review from "../../models/Review";
import User from "../../models/User";
class ProductServices {
    async createProduct(user_id , product) {
        const newProduct = await Product.create({
            title: product.title,
            price: product.price,
            specification: product.specification,
            various_size: product.various_size,
            requiredAttachments: product.requiredAttachments,
            images: product.images,
            user_id: user_id,
        });
        return newProduct;
  

    }
    async addReview(uid,body){
        const user = await User.findById(uid);  
        const review = await Review.create({
            name : user.name,
            product_id : body.product_id,
            star : body.star,
            description : body.description,
            timestamp :  new Date().toLocaleString()
        })
        return review._id;
        
    }   
  }
  
  export default new ProductServices;
  