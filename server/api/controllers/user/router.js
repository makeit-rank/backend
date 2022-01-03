import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/getuserdata',controller.getUserDetails)
  .post('/becomeaseller',controller.becomeASeller)
  .post('/addaddress',controller.addAddress)
  .post('/addtocart',controller.addToCart)
  .get('/getcart',controller.getCart)
  .post('/removefromcart',controller.removeFromCart)
  .post('/addtowishlist',controller.addToWishList)
  
  
  
