/************************* imports *************************/
import {model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';

/************************* regex patterns *************************/
const name_pattern = /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)(,? (?:[JS]r\.?|II|III|IV))?$/g;
const email_pattern = /^[!A-Z0-9#$&?*^~_%+-]+(\.[A-Z0-9!_%+-^]+)*?@[A-Z0-9-]+([A-Z0-9.-])*\.[A-Z]{2,}$/i;


/************************* schema *************************/
const userSchema = new Schema({
      username: {
         type: String,
         trim: true,
         required: [true, 'First and last name are required!'],
         minlength: [4, 'Full name must be at least 4 characters!'],
         maxLength: [33, 'Full name cannot exceed 32 characters!'],
         match: [name_pattern, 'Enter first and last name!']
      },
      email: {
         type: String,
         trim: true,
         lowercase: true,
         required: [true, 'Email is required!'],
         unique: [true, 'Email already exists!'],
         match: [email_pattern, 'Enter a valid email!']
      },
      password: {
         type: String,
         trim: true,
         required: [true, 'Password is required!'],
         minlength: [8, 'Password must be at least 8 characters!']
      },
      role: {
         type: String,
         enum: ['user', 'admin'],
         default: 'user'
      }
   },
   {timestamps: true}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next()
   }

   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
});

const User = new model('user', userSchema);
export default User;