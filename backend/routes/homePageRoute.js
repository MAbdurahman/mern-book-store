/************************* imports *************************/
import express from 'express';
import HomePage from '../pages/homePage.js';

/************************* variables *************************/
const router = express.Router();

/*************************** route ***************************/
router.get('/', (req, res) => {
   res.send(HomePage());
});

export default router;