import Product from "../../models/Product";
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
  }
  
  export default new ProductServices;
  