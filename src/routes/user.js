import express from 'express';
import { userValidator } from '../validations';
import { userController } from '../controllers';

const { validateSignup, validateLogin } = userValidator;
const { signupUser, loginUser } = userController;

export const userRouter = express.Router();

userRouter.post('/signup', validateSignup, signupUser);
userRouter.post('/login', validateLogin, loginUser);

