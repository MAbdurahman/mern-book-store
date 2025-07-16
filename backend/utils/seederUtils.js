/************************* imports *************************/
import dotenv from 'dotenv';
import colors from 'colors';
import connectDatabase from '../config/databaseConfig.js';
import Product from '../models/productModel.js';
import products from '../data/products.js';
import User from '../models/userModel.js';
import users from '../data/users.js';

/************************* configure setup *************************/
dotenv.config({path: 'backend/config/config.env'});
colors.enabled = true;

/********************** connect MongoDB and Cloudinary **********************/
connectDatabase().then(() => {});

/********************** seed products to the database **********************/
const seedProducts = async () => {
   try {
      await Product.deleteMany();
      await User.deleteMany({});

      const createdUsers = await User.insertMany(users);
      const adminUser = createdUsers[0]._id;

      const sampleProducts = products.map((product) => {
         return {...product, user: adminUser};
      });

      await Product.insertMany(sampleProducts);
      console.log(`  ➔  Seeded Data:  Successfully inserted data to database!`.green.italic);
      process.exit(0);
   } catch (err) {
      console.log(`  ➔  Seeded Data:  Error - ${err.message}`.red.italic);
      process.exit(1);
   }
};

/********************** delete products in the database **********************/
const deleteSeedProducts = async () => {
   try {
      await Product.deleteMany();
      await User.deleteMany();

      console.log(`  ➔  Seeded Data:  Successfully deleted data from database!`.green.italic);
      process.exit(0);
   } catch (err) {
      console.log(`  ➔  Seeded Data:  Error - ${err.message}`.red.italic);
      process.exit(1);
   }
};

if (process.argv[2] === '-delete') {
   deleteSeedProducts().then(() => {});

} else if (process.argv[2] === '-insert') {
   seedProducts().then(() => {});

} else {
   console.log(`➔  Seeded Data: This command requires second argument to be '-delete' or '-insert'!`.yellow.bold.italic);
   process.exit(0);
}