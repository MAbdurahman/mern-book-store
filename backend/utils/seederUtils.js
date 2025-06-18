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
connectDatabase().then(() => {
});

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
      console.log(`  ➔  Seeded Data:  Successfully inserted to database!`.green.italic);
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

      console.log(`  ➔  Seeded Data:  Successfully deleted from database!`.green.italic);
      process.exit(0);
   } catch (err) {
      console.log(`  ➔  Seeded Data:  Error - ${err.message}`.red.italic);
      process.exit(1);
   }
};

if (process.argv[2] === '-d') {
   deleteSeedProducts().then(r => {});

} else {
   seedProducts().then(r => {});

}