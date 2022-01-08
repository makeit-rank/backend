import Order from "../../models/Order";
import Cart from "../../models/Cart";
import userService from "./user.service";
import productService from "./product.service";
class OrderService {
  async createOrder(uid, body) {
    const order = {
      product_id: body.product_id,
      size: body.size,
      AttachedFiles: body.AttachedFiles ? body.AttachedFiles : null,
      user_id: uid,
      status: {
        Ordered: new Date().toISOString(),
      },
      created_at: new Date().toISOString(),
    };
    const newOrder = await Order.create(order);
    return newOrder._id;
  }
  async createCartOrder(uid) {
    const carts = await userService.getCart(uid);
    const orders = [];
    for (let i = 0; i < carts.length; i++) {
      const newOrder = await this.createOrder(uid, carts[i]);
      orders.push(newOrder._id);
    }
    const cart = await Cart.deleteMany({ user_id: uid });
    return orders;
  }
  async getOrderforSeller(uid) {
    const products = await productService.getProductSellerid(uid);
    const orders = await Order.find({
      product_id: { $in: products },
    });
    return orders;
  }
}
export default new OrderService();
