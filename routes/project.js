import express from 'express';

import { loginproject, addprojectgroupe,alltasks } from '../controllers/project.js';
  
const router = express.Router();

router
  .route('/loginproject')
  .post(loginproject);

router
  .route('/addprojectgroupe')
  .post(addprojectgroupe);

router
  .route('/:alltasks')
  .get(alltasks);

export default router;