import Cart from "../../models/Cart";

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
}
export default new CartService();