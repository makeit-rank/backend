import Cart from "../../models/Cart";
import Product from "../../models/Product";
import User from "../../models/User";
import productService from "./product.service";

class UserService {
  async addToCart(uid, body) {
    const cart = await Cart.create({ ...body, user_id: uid });
    return cart;
  }
  async getCart(uid) {
    const carts = await Cart.find({ user_id: uid });
    for (let i = 0; i < carts.length; i++) {
      const product = await Product.findById(carts[i].product_id);
      carts[i].product_details = product;
    }
    return carts;
  }
  async removeFromCart(uid, body) {
    const cart = await Cart.findById(body.cart_id);
    if (cart.user_id == uid) {
      await Cart.findByIdAndDelete(body.cart_id);
      return true;
    } else {
      return false;
    }
  }
  async addToWishList(uid, body) {
    const user = await User.findByIdAndUpdate(uid, {
      $push: { wishlist: body.product_id },
    });
    return user;
  }
  async getWishlist(uid) {
    const user = await User.findById(uid);
    return user.wishlist;
  }
  async removeWishlist(uid, product_id) {
    await User.findByIdAndUpdate(uid, {
      $pull: { wishlist: product_id },
    });
    return;
  }
  async moveTowishlist(uid, body) {
    const cart = await Cart.findByIdAndDelete(body.cart_id);

    const user = await User.findByIdAndUpdate(uid, {
      $push: { wishlist: cart.product_id },
    });
    return cart;
  }
}
export default new UserService();
