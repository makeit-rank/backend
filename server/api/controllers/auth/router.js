import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .post("/login", controller.login)
  .get("/test", async (req, res) => {
    // return origin name and address
    res.send({
      host: req.get("host"),
      originalUrl: req.originalUrl,
      origin: req.get("origin"),
    });
  })
  .post("/signup", controller.signup);
