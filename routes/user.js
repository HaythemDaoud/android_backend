import express from 'express';

import { addgroup, signin, signup, } from '../controllers/user.js';
  
const router = express.Router();

router
  .route('/signin')
  .post(signin);

router
  .route('/signup')
  .post(signup);

  router
  .route('/:usermail/:groupid')
  .post(addgroup);


export default router;