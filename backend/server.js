/************************* imports *************************/
import dotenv from "dotenv";
import colors from "colors";
import app from './app/app.js';
import connectDatabase from './config/databaseConfig.js';
import connectCloudinary from './config/cloudinaryConfig.js';

/************************* configure setup *************************/
dotenv.config({path: 'backend/config/config.env'});
colors.enabled = true;

/************************* handling Uncaught exceptions *************************/
process.on('uncaughtException', err => {
   console.log(`uncaughtException ERROR: ${err.stack}`);
   console.log(`  ➔  Server:  Shutting down the due to Uncaught Exception!`.yellow);
   process.exit(1);
});

/************************* variables *************************/
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_ENV || "/api/v1.0/";
const ADDENDUM = `\t\t...press Ctrl-C to terminate.\n`.white;

/********************** connect MongoDB and Cloudinary **********************/
// connectDatabase().then(() => {});
// connectCloudinary().then(() => {});

/************************* app listening *************************/
const server = app.listen(PORT, () => {
   console.log(`  ➔  Server:  Listening at http://127.0.0.1:${PORT}${API_URL} in ${NODE_ENV} mode!`.yellow);
   console.log(ADDENDUM);
});

/********************** handling unhandled promise rejection **********************/
process.on('unhandledRejection', err => {
   console.log(`unhandledRejection ERROR: ${err.stack}`);
   console.log(`  ➔  Server:  Shutting down due to Unhandled Promise Rejection!`.yellow);
   server.close(() => {
      process.exit(1);
   });
});