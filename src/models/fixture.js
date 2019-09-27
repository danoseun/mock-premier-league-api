import mongoose from 'mongoose';

const { Schema } = mongoose;

const fixtureSchema = new Schema({
  //user: { type: Schema.Types.ObjectId, ref: 'users' },
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  homeTeamScore: { type: Number },
  awayTeamScore: { type: Number },
  matchDate: { type: Date, required: true },
  venue: { type: String, required: true },
  link: { type: String },
  pending: { type: Boolean, default: true }
});

export const Fixture = mongoose.model('fixtures', fixtureSchema);
