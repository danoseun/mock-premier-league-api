import mongoose from 'mongoose';

const { Schema } = mongoose;

const teamSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  name: { type: String, required: true },
});

export const Team = mongoose.model('teams', teamSchema);
