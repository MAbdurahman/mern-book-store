/************************* imports *************************/
import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
   const token = jwt.sign({
      id: user.id,
      role: user.role,
      email: user.email,
      username: user.username
   }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME
   });

   res.cookie('book-store', token, {
      history: true,
      sameSite: "strict",
      maxAge: 90 * 24 * 60 * 60 * 1000,
   });
}

export default generateToken;