import * as express from "express";
import makeRapydRequest from "../../services/helpers/rapydAPI.service";
import controller from "./controller";

export default express
  .Router()
  .post("/login", controller.login)
  .get("/test", async (req, res) => {
    res.send({
      host: req.get("host"),
      originalUrl: req.originalUrl,
      origin: req.get("origin"),
    });
  })
  .post("/signup", controller.signup);
