/************************* imports *************************/
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
   });

   res.cookie('book-store', token, {
      history: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
   });
}

export default generateToken;