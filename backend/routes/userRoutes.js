/************************* imports*************************/
import express from 'express';
import {signUpUser, signInUser, signOutUser, getAllUsers, deleteUser, getSingleUser, getUserProfile, updateUser, updateUserProfile} from '../controllers/userController.js';
import {authenticateUser, authorizeRole} from '../middlewares/authMiddleware.js';

/************************* variables *************************/
const router = express.Router();

/************************** routes **************************/
router.post('/', signUpUser);
router.post('/', signInUser);
router.get('/', signOutUser);
router.get('/', authenticateUser, authorizeRole('admin'), getAllUsers);
router.get('/:userId', authenticateUser, authorizeRole('admin'), getSingleUser);
router.get('/:userId', authenticateUser, getUserProfile);
router.put('/:userId', authenticateUser, updateUserProfile);
router.put('/:userId', authenticateUser, authorizeRole('admin'), updateUser);
router.delete('/:userId', authenticateUser, authorizeRole('admin'), deleteUser);






export default router;