import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .post("/addorder", controller.createOrder)
  .post("/addcartorder", controller.createCartOrder)
  .get("/getorderforseller", controller.getOrderforSeller)
  .put("/updatestatus", controller.updateStatus)
  .get("/getorderforuser", controller.getOrderforUser)
  .get("/getorderbyid", controller.getOrderById);
