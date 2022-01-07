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
        });
        const product = await Product.findById(body.product_id);
        const count = product.rating?.count?product.rating.count:0
        const star = product.rating?.star?product.rating.star:0 
        const newStar = (star*count + body.star)/(count+1)
        const rating = {
            star : newStar.toFixed(2), 
            count :  count + 1
        }
        await Product.findByIdAndUpdate(body.product_id,{
            rating : rating
        });
        return review._id;
        
        
    }   
    async getProductById(id){
        const product = await Product.findById(id);
        const reviewsOfProduct = await Review.find({product_id : id});
        
        return {...product["_doc"],reviews: {...reviewsOfProduct}};
    }
  }
  
  export default new ProductServices;
  