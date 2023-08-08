import express from 'express';
const router = express.Router();

import { getAllUsers, login, SignUp } from '../controllers/UserController.js';

                   
 
////  path , controller      that  app.js <=  routes =< controller <= model 
router.get('/', getAllUsers)    

router.post('/signup',SignUp)

router.post('/login',login)

export default router;