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
}
export default new CartService();