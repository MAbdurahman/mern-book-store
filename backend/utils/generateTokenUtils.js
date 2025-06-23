/************************* imports *************************/
import jwt from 'jsonwebtoken';

const generateToken = (res, user) => {
   const token = jwt.sign({
      _id: user._id,
      role: user.role,
      email: user.email,
      username: user.username
   }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME
   });

   res.cookie('book_store', token, {
      history: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === 'production',
      maxAge: 400 * 24 * 60 * 60 * 1000,
   });
}

export default generateToken;