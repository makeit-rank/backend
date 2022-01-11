import * as express from "express";
import controller from "./controller";

export default express
  .Router()

  .post("/login", controller.login)
  .post("/signup", controller.signup);
