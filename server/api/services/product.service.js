import Product from "../../models/Product";
import Review from "../../models/Review";
class ProductServices {
    async createProduct(user_id , product) {
        const newProduct = await Product.create({
            title: product.title,
            price: product.price,
            specification: product.specification,
            various_size: product.various_size,
            customizable: product.customizable,
            images: product.images,
            user_id: user_id,
        });
        return newProduct;
  

    }
    async addReview(body){
        const review = await Review.create({
            product_id : body.product_id,
            star : body.star,
            headline : body.headline,
            images : body.images,
            description : body.description,
            timestamp :  new Date().toLocaleString()
        })
        return review._id;
        
    }   
  }
  
  export default new ProductServices;
  