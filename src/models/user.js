import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fisrtname: String,
  lastname: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() }
});

export const User = mongoose.model('users', userSchema);
