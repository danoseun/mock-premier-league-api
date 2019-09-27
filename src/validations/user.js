import Validator from 'validatorjs';
import { User } from '../models';

export const userValidator = {

  /** This functions validates signup data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
      */
  async validateSignup(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      email, password, firstname, lastname
    } = req.body;

    const rules = {
      email: 'required|email|min:10|max:30',
      password: 'required|min:6|max:16',
      firstname: 'required|min:2|max:20|alpha',
      lastname: 'required|min:2|max:20|alpha'
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }
    email = email.toLowerCase().trim();
    try {
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        return res.status(400).json({
          status: 400,
          error: `${email} already exists`
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
    req.body.email = email;
    req.body.password = password.trim();
    req.body.firstname = firstname.toLowerCase().trim();
    req.body.lastname = lastname.toLowerCase().trim();
    return next();
  },

  /** This function validates login data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
  */
  async validateLogin(req, res, next) {
    let { email, password } = req.body;

    const rules = {
      email: 'required|email',
      password: 'required'
    };
    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }

    email = email.toLowerCase().trim();
    try {
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(401).json({
          status: 401,
          error: 'Authentication failed'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }

    password = password.trim();
    req.body.email = email;
    req.body.password = password;
    return next();
  }
};
