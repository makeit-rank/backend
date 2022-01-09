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
        Ordered: new Date().getTime(),
      },
      created_at: new Date().getTime(),
    };
    if (order.AttachedFiles === null)
      order.status["Delivered"] = new Date().getTime();
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
    }).sort({ created_at: -1 });
    return orders;
  }
  async updateStatus(body) {
    const order = await Order.findById(body.order_id);
    if (body.status === "Confirmed") {
      order.body.status["Confirmed"] = new Date().getTime();
    } else if (body.status === "Approved") {
      order.body.status["Delivered"] = new Date().getTime();
    } else if (body.status === "AskedForChange") {
      order.body.status["AskedForChange"].push({
        data: body.Textdata, // Text
        date: new Date().getTime(),
      });
    } else if (body.status === "AskedForApprove") {
      order.status["AskedForApprove"].push({
        data: body.Imagedata, // Links of images
        date: new Date().getTime(),
      });
    }

    await order.save();
    return order;
  }
  async getOrderforUser(uid) {
    const orders = await Order.find({ user_id: uid }).sort({ created_at: -1 });
    return orders;
  }
}
export default new OrderService();
