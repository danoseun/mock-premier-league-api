/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return `Bearer ${token}`;
};

export const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      status: 403,
      error: 'No token supplied'
    });
  }
  token = token.split(' ')[1];
  jwt.verify(token, process.env.SECRETKEY, (error, authData) => {
    //console.log('authData', authData);
    if (error) {
      if (error.message.includes('signature')) {
        return res.status(403).json({
          status: 403,
          error: 'Invalid token supplied'
        });
      }
      return res.status(403).json({
        status: 403,
        error: error.message
      });
    }
    req.authData = authData;
    return next();
  });
};

export const verifyAdmin = (req, res, next) => {
  const { isAdmin } = req.authData.payload;
  if (isAdmin) {
    return next();
  }

  return res.status(401).json({
    status: 401,
    error: 'You do not have permissions to access this route'
  });
};
