import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .get("/getuserdata", controller.getUserDetails)
  .post("/becomeaseller", controller.becomeASeller)
  .post("/addaddress", controller.addAddress)
  .post("/addtocart", controller.addToCart)
  .get("/getcart", controller.getCart)
  .delete("/removefromcart", controller.removeFromCart)
  .post("/addtowishlist", controller.addToWishList)
  .get("/getwishlist", controller.getWishList)
  .delete("/removefromwishlist", controller.removeFromWishlist)
  .post("/movetowishlist", controller.moveToWishList);
