
/************************* imports *************************/
import bcrypt from 'bcryptjs';

const users = [
   {
      username: 'John Doe',
      email: 'johndoe@gmail.com',
      password: bcrypt.hashSync('Aa!2qwer', 10),
      role: 'admin',
   },
   {
      username: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: bcrypt.hashSync('Aa!2qwer', 10),
      role: 'user'
   },
   {
      username: 'James Doe',
      email: 'jamesdoe@gmail.com',
      password: bcrypt.hashSync('Aa!2qwer', 10),
      role: 'user'
   }

]

export default users;