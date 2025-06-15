/************************* imports *************************/
import dotenv from "dotenv";
import colors from "colors";
import connectDatabase from '../config/databaseConfig.js';
import Product from '../models/productModel.js';
import products from '../data/products.json';


/************************* configure setup *************************/
dotenv.config({path: 'backend/config/config.env'});
colors.enabled = true;

/********************** connect MongoDB and Cloudinary **********************/
connectDatabase().then(() => {});

/********************** seed products to the database **********************/
const seedProducts = async () => {
   try {
      await Product.deleteMany();
      console.log('All products are deleted from database!');

      await Product.insertMany(products);
      console.log('All products are added to database!');

      process.exit();
   } catch (error) {
      console.log(error.message);
      process.exit();
   }
};

seedProducts().then(r => {});