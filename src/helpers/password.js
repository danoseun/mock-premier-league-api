/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const rounds = Number(process.env.ROUNDS);

/**
       * Hash Password Method
       * @param {string} password
       * @returns {string} returns hashed password
       */
export const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(rounds));

/**
       * compare Password
       * @param {string} password
       * @param {string} hashedPassword
       * @returns {Boolean} return true or false
       */
export const comparePassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
