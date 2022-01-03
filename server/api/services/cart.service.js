import Cart from "../../models/Cart";
import User from "../../models/User";

class CartService{
    async addToCart(uid, body){
        const cart = await Cart.create({...body,"user_id":uid});
        return cart;
    }
    async getCart(uid){
        const carts = await Cart.find({user_id:uid});
        return carts;
    }
    async removeFromCart(uid,body){
        const cart = await Cart.findById(body.cart_id);
        if(cart.user_id==uid){
            await Cart.findByIdAndDelete(body.cart_id);
            return true;
        }
        else{
            return false;
        }

      
    }
    async addToWishList(uid,body){
        
        const user = await User.findByIdAndUpdate(uid,{$push:{wishlist : body.product_id}});
        return user;
        
        
    }
}
export default new CartService();