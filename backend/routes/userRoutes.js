/************************* imports*************************/
import express from 'express';
import {signUpUser, signInUser, signOutUser, getAllUsers, deleteUser, getSingleUser, getUserProfile, updateUser, updateUserProfile} from '../controllers/userController.js';
import {authenticateUser, authorizeRole} from '../middlewares/authMiddleware.js';

/************************* variables *************************/
const router = express.Router();

/************************** routes **************************/
router.post('/sign-up', signUpUser);
router.post('/sign-in', signInUser);
router.post('/sign-out', signOutUser);
router.get('/get-user-profile', authenticateUser, getUserProfile);
router.put('/update-user-profile', authenticateUser, updateUserProfile);
router.get('/get-all-users', authenticateUser, authorizeRole('admin'), getAllUsers);
router.get('/get-user/:userId', authenticateUser, authorizeRole('admin'), getSingleUser);
router.put('/update-user/:userId', authenticateUser, authorizeRole('admin'), updateUser);
router.delete('/delete-user/:userId', authenticateUser, authorizeRole('admin'), deleteUser);






export default router;