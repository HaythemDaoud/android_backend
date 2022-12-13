import express from 'express';

import { find, create,getalltask } from '../controllers/task.js';
  
const router = express.Router();

router
  .route('/getgrouptasks')
  .post(find);

router
  .route('/create')
  .post(create);

  router
  .route('/getalltask')
  .get(getalltask)



export default router;