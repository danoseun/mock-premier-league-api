import { User } from '../models';
import { hashPassword, comparePassword } from '../helpers/password';
import { createToken } from '../middlewares/auth';

export const userController = {
  /**
     * Create user account on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof userController object
     */

  async signupUser(req, res) {
    const {
      email, password, firstname, lastname
    } = req.body;
    const hash = hashPassword(password);

    const newUser = new User({
      email,
      password: hash,
      firstname,
      lastname
    });

    try {
      const result = await newUser.save();
      // console.log('result1', result);
      const token = createToken(result);
      result.token = token;
      // console.log('result2', token);
      return res.status(201).json({
        status: 201,
        data: token
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const foundUser = await User.findOne({ email });
      const compare = comparePassword(password, foundUser.password);
      if (!compare) {
        return res.status(401).json({
          status: 401,
          error: 'Email or password incorrect'
        });
      }
      const token = createToken(foundUser);
      return res.status(200).json({
        status: 200,
        data: token
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
};
