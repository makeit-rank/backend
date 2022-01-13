import Order from "../../models/Order";
import Cart from "../../models/Cart";
import userService from "./user.service";
import productService from "./product.service";
import Product from "../../models/Product";
import Seller from "../../models/Seller";
class OrderService {
  async createOrder(uid, body) {
    const order = {
      product_id: body.product_id,
      size: body.size,
      attachedFiles: body.attachedFiles ? body.attachedFiles : null,
      user_id: uid,
      status: {
        Ordered: new Date().getTime(),
      },
      created_at: new Date().getTime(),
      address: body.address,
    };
    if (order.attachedFiles === null)
      order.status["Delivered"] = new Date().getTime();
    const newOrder = await Order.create(order);
    return newOrder._id;
  }
  async createCartOrder(uid, body) {
    const carts = await userService.getCart(uid);
    const orders = [];
    for (let i = 0; i < carts.length; i++) {
      const newOrder = await this.createOrder(uid, {
        ...carts[i]["_doc"],
        address: body.address,
      });
      orders.push(newOrder._id);
    }
    const cart = await Cart.deleteMany({ user_id: uid });
    return orders;
  }
  async getOrderforSeller(uid) {
    const seller = await Seller.findOne({ user_id: uid });
    const products = seller.products;
    const orders = await Order.find({
      product_id: { $in: products },
    }).sort({ created_at: -1 });

    for (let i = 0; i < orders.length; i++) {
      const product = await Product.findById(orders[i].product_id);
      if (product) orders[i].product_details = product;
    }
    return orders;
  }
  async updateStatus(body) {
    const order = await Order.findById(body.order_id);
    if (body.status === "Confirmed") {
      order.status["Confirmed"] = new Date().getTime();
      // } else if (body.status === "Approved") {
      //   order.status["Delivered"] = new Date().getTime();
    } else if (body.status === "AskedForChange") {
      order.status["AskedForChange"]
        ? order.status["AskedForChange"].push({
            data: body.Textdata, // Text
            date: new Date().getTime(),
            changeStatus: body.changeStatus,
          })
        : (order.status["AskedForChange"] = [
            {
              data: body.Textdata,
              date: new Date().getTime(),
              changeStatus: body.changeStatus,
            },
          ]);

      if (body.changeStatus === false) {
        order.status["Delivered"] = new Date().getTime();
      }
    } else if (body.status === "AskedForApprove") {
      order.status["AskedForApprove"]
        ? order.status["AskedForApprove"].push({
            data: body.ImageData, // links of images
            date: new Date().getTime(),
          })
        : (order.status["AskedForApprove"] = [
            {
              data: body.ImageData,
              date: new Date().getTime(),
            },
          ]);
    }
    order.markModified("status");

    await order.save();
    return order;
  }
  async getOrderforUser(uid) {
    const orders = await Order.find({ user_id: uid }).sort({ created_at: -1 });
    for (let i = 0; i < orders.length; i++) {
      const product = await Product.findById(orders[i].product_id);
      if (product) orders[i].product_details = product;
    }
    return orders;
  }
  async getOrderById(uid, id) {
    const order = await Order.findById(id);
    const product = await Product.findById(order.product_id);
    if (product) order.product_details = product;
    const seller = await Seller.findOne({ user_id: product.user_id });
    if (seller) order.seller_details = seller;
    console.log(order, seller, product);
    if (uid !== order.user_id && uid !== seller.user_id) return null;
    return order;
  }
}
export default new OrderService();
