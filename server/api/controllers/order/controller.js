import authenticationService from "../../services/authentication.service";
import orderService from "../../services/order.service";

export class Controller {
  async createOrder(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      const order = await orderService.createOrder(decoded.id, req.body);
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async createCartOrder(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      const order = await orderService.createCartOrder(decoded.id);

      res.status(200).send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async getOrderforSeller(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      const orders = await orderService.getOrderforSeller(decoded.id);
      res.status(200).send(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async confirmOrder(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      const order = await orderService.confirmOrder(req.body.order_id);
      res.status(200).send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async updateStatus(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      const order = await orderService.updateStatus(req.body);
      res.status(200).send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

export default new Controller();
