import express from 'express';

import {  signin, signup,patchOnce, forgot_password,reset_password_get, reset_password_post, } from '../controllers/user.js';
  
const router = express.Router();

router
  .route('/signin')
  .post(signin);

router
  .route('/signup')
  .post(signup);

  router
  .route('/:usermail/:groupid')
  .post(patchOnce);

  router
  .route('/forgot_password')
  .post(forgot_password);

  router
  .route('/reset_password/:email/:token')
  .get(reset_password_get);

  router
  .route('/reset_password/:email/:token')
  .post(reset_password_post);


export default router;