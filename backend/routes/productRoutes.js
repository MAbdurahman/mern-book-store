/************************* imports*************************/
import express from 'express';
import {getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct,
createProductReview} from '../controllers/productController.js';

/************************* variables *************************/
const router = express.Router();

/************************** routes **************************/
router.post('/', createProduct);
router.get('/', getAllProducts);
router.get('/:productId', getSingleProduct);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);


export default router;