import express from 'express';

export const defaultRouter = express.Router();

defaultRouter.get('/', (req, res) => res.status(200).json({
  data: 'Welcome to the mock premier league API'
}));

defaultRouter.all('*', (req, res) => res.status(404).json({
  error: 'Sorry, page not found!'
}));
