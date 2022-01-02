import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/getuserdata',controller.getUserDetails)
  .post('/login',controller.login)
  .post('/signin',controller.signin)
  
