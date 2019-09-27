import mongoose from 'mongoose';
import { hashPassword } from '../helpers/password';
import connect from './connection';

const db = connect();

db.User.insertMany([
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: 'Admin',
    lastName: 'Admin',
    email: 'admin@gmail.com',
    password: hashPassword('password'),
    isAdmin: true,
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: 'James',
    lastname: 'Bondss',
    email: 'jammy@gmail.com',
    password: hashPassword('password'),
    isAdmin: false,
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: 'Samuel',
    lastname: 'Binuetan',
    email: 'samubins@gmail.com',
    password: hashPassword('password'),
    isAdmin: false
  }, {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: 'Manager',
    lastname: 'Jude',
    email: 'mj@gmail.com',
    password: hashPassword('Kazeem27$'),
    isAdmin: false
  }, {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: 'Okoranwan',
    lastName: 'Jude',
    email: 'judeokan@yahoo.com',
    password: hashPassword('Kazeem27$'),
    isAdmin: false
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: 'request',
    lastName: 'man',
    email: 'requestman@gmail.com',
    password: hashPassword('requestman'),
    isAdmin: false
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: 'Gbefu',
    lastname: 'Daniels',
    email: 'gbefdans@gmail.com',
    password: hashPassword('password'),
    isAdmin: false
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: 'Temitayo',
    lastname: 'Bakstar',
    email: 'temibaks@gmail.com',
    password: hashPassword('password'),
    isAdmin: false
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firsname: 'Nonso',
    lastname: 'Obikili',
    email: 'nonsobiks@gmail.com',
    password: hashPassword('password'),
    isAdmin: false
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: 'Jasi',
    lastname: 'James',
    email: 'jasijames@gmail.com',
    password: hashPassword('password'),
    isAdmin: false
  },
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstname: 'wale',
    lastname: 'spencer',
    email: 'spencer@gmail.com',
    password: hashPassword('password'),
    isAdmin: false
  }
]);
