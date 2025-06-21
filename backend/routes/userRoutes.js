/************************* imports*************************/
import express from 'express';
import {signUpUser, signInUser, signOutUser} from '../controllers/userController.js';

/************************* variables *************************/
const router = express.Router();

/************************** routes **************************/
router.post('/', signUpUser);
router.post('/', signInUser);
router.get('/', signOutUser);






export default router;