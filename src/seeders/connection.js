import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connect = async () => {
  try {
    const db = await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('Connected to the DB');
    return db;
  } catch (error) {
    console.log(error);
  }
};

export default connect;
