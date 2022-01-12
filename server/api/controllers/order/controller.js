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
      const order = await orderService.createCartOrder(decoded.id, req.body);

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

  async updateStatus(req, res) {
    const order = await orderService.updateStatus(req.body);
    res.status(200).send(order);
  }

  async getOrderforUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      const orders = await orderService.getOrderforUser(decoded.id);
      res.status(200).send(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async getOrderById(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await authenticationService.verifyToken(token);
      if (decoded) {
        const order = await orderService.getOrderById(
          decoded.id,
          req.query.order_id
        );

        if (order !== null) {
          return res.status(200).send(order);
        } else {
          return res.status(404).send("Order not found");
        }
      } else {
        return res.status(401).send({ message: "Unauthorized" });
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export default new Controller();
