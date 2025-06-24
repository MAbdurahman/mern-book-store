/************************* imports*************************/
import express from 'express';
import {getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct,
createProductReview} from '../controllers/productController.js';
import {authenticateUser, authorizeRole} from '../middlewares/authMiddleware.js';

/************************* variables *************************/
const router = express.Router();

/************************** routes **************************/
router.get('/', getAllProducts);
router.get('/:productId', getSingleProduct);
router.post('/:productId/reviews', authenticateUser, createProductReview);
router.post('/', authenticateUser, authorizeRole('admin'), createProduct);
router.put('/:productId', authenticateUser, authorizeRole('admin'), updateProduct);
router.delete('/:productId', authenticateUser, authorizeRole('admin'), deleteProduct);

export default router;