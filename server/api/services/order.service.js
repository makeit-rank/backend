import Order from "../../models/Order";
import Cart from "../../models/Cart";
import userService from "./user.service";
import productService from "./product.service";
import Product from "../../models/Product";
import Seller from "../../models/Seller";
import makeRapydRequest from "./helpers/rapydAPI.service";
class OrderService {
  async fetchAllPaymentMethods(locationInfo) {
    try {
      const resp = await makeRapydRequest(
        "GET",
        `/v1/payment_methods/country?country=${locationInfo.country}&currency=${locationInfo.currency}`
      );
      return resp.body.data;
    } catch (error) {
      console.error("Error completing request", error);
      throw error;
    }
  }

  async createOrder(uid, checkoutBody) {
    const order = {
      product_id: checkoutBody.product_id,
      size: checkoutBody.size,
      attachedFiles:
        checkoutBody.attachedFiles.length !== 0
          ? checkoutBody.attachedFiles
          : null,
      user_id: uid,
      status: {
        Ordered: new Date().getTime(),
      },
      created_at: new Date().getTime(),
      address: checkoutBody.address,
    };
    if (order.attachedFiles === null) {
      order.status["Delivered"] = new Date().getTime();
    }

    const productInfo = await productService.getProductById(
      checkoutBody.product_id
    );

    const newOrder = await Order.create({
      ...order,
    });

    const rapydCheckoutBody = {
      amount: productInfo.price,
      complete_checkout_url: "http://example.com/complete",
      country: checkoutBody.country,
      currency: checkoutBody.currency,
      requested_currency: checkoutBody.currency,
      merchant_reference_id: newOrder._id,
      payment_method_types_include: checkoutBody.paymentMethod,
    };

    const result = await makeRapydRequest(
      "POST",
      "/v1/checkout",
      rapydCheckoutBody
    );

    newOrder.rapyd_checkout_id = result.body.data.id;
    newOrder.page_expiration = result.body.data.page_expiration * 1000;

    await newOrder.save();
    console.log(result.body.data.id);
    console.log(
      new Date(result.body.data.page_expiration * 1000).toLocaleString()
    );

    return {
      order: newOrder._id,
      checkout_id: newOrder.rapyd_checkout_id,
    };
  }

  async markPaymentComplete(checkoutBody) {
    try {
      const order = await Order.updateOne(
        { rapyd_checkout_id: checkoutBody.checkout_id },
        {
          $set: {
            rapyd_payment_id: checkoutBody.payment_id,
            isPaid: true,
          },
        }
      );
      return order;
    } catch (error) {
      console.error("Error completing request", error);
      throw error;
    }
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
