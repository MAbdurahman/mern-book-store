/************************* imports *************************/
import express from 'express';
import {authenticateUser, authorizeRole} from '../middlewares/authMiddleware.js';
import {
   addOrderItems,
   getAllUsersOrders,
   getUserOrders,
   getSingleOrder,
   updateOrderToPaid,
   updateOrderToDelivered,
   deleteOrder
} from '../controllers/orderController.js';


/************************* variables *************************/
const router = express.Router();

/************************** routes ***************************/
router.post('/', authenticateUser, addOrderItems);
router.get('/',  authenticateUser, authorizeRole('admin'), getAllUsersOrders);

router.get('/user-orders', authenticateUser, getUserOrders);

router.get('/:orderId', authenticateUser, getSingleOrder);
router.put('/:orderId/pay', authenticateUser, updateOrderToPaid);
router.put('/:orderId/delivered', authenticateUser, authorizeRole('admin'), updateOrderToDelivered);
router.delete('/:orderId', authenticateUser, authorizeRole('admin'), deleteOrder);

export default router;