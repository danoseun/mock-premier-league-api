/* eslint-disable max-len */
import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {
  defaultRouter, userRouter, protectedRouter, publicRouter
} from './routes';


dotenv.config();

const app = express();
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

const testURI = process.env.TEST_ATLAS_URI;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect(testURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('TEST MongoDB connected'))
    .catch((error) => console.log(error));
}


app.use('/api', userRouter);
app.use('/api', protectedRouter);
app.use('/api', publicRouter);
app.use('/api', defaultRouter);


const port = process.env.PORT || 7700;

app.listen(port, () => {
  console.log(`Server is live on PORT ${port}`);
});


export default app;
