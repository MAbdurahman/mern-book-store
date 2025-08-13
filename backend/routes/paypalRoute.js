/************************* imports *************************/
import express from 'express';

/************************* variables *************************/
const router = express.Router();

/*************************** route ***************************/
router.get('/', (req, res) => {
   res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
});

export default router;