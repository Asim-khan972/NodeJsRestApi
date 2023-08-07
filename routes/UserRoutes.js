import express from 'express';
import { getAllUsers, SignUp } from '../controllers/UserController.js';

const router = express.Router();
                   
 
////  path , controller      that  app.js <=  routes =< controller <= model 
router.get('/', getAllUsers)    

router.post('/signup',SignUp)

export default router;