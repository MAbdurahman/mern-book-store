/************************* imports *************************/
import mongoose from 'mongoose';
import colors from 'colors';

colors.enable();
mongoose.set('strictQuery', true);

const connectDatabase = async () => {
   try {
      const connect = await mongoose.connect(process.env.MONGO_DB_URI);
      console.log(`  ➔  MongoDB:  Connected to ${connect.connection.host} with mongoose`.cyan.italic);
   } catch (error) {
      console.error(`  ➔  MongoDB:  Error - ${error.message}`.red.italic);
      process.exit(1);
   }
};

export default connectDatabase;