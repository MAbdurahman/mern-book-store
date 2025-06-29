/************************* imports *************************/
import express from 'express';
import {authenticateUser, authorizeRole} from '../middlewares/authMiddleware.js';
import {
   addOrderItems,
   getAllUsersOrders,
   getMyOrders,
   getOrderById,
   updateOrderToPaid,
   updateOrderToDelivered
} from '../controllers/orderController.js';


/************************* variables *************************/
const router = express.Router();

/************************** routes ***************************/
router.post('/', authenticateUser, addOrderItems);
router.get('/',  authenticateUser, authorizeRole('admin'), getAllUsersOrders);

router.get('/my-orders', authenticateUser, getMyOrders);

router.get('/:orderId', authenticateUser, getOrderById);
router.put('/:orderId/pay', authenticateUser, updateOrderToPaid);
router.put('/:orderId/delivered', authenticateUser, authorizeRole('admin'), updateOrderToDelivered);

export default router;