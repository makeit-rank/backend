import * as express from "express";
import makeRapydRequest from "../../services/helpers/rapydAPI.service";
import controller from "./controller";

export default express
  .Router()

  .post("/login", controller.login)
  .get("/shit", async (req, res) => {
    res.send(req.get("host"));
  })
  .post("/signup", controller.signup);
