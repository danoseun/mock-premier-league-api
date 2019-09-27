/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongooseCache from 'mongoose-redis';
import Validator from 'validatorjs';
import { Team, Fixture } from '../models';

dotenv.config();

const redisLink = process.env.REDIS_LINK;


const cache = MongooseCache(mongoose, redisLink);

export const fixtureValidator = {
  /** This functions validates fixture data
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
      */
  async validateFixture(req, res, next) {
    let {
      homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchDate, venue
    } = req.body;

    const rules = {
      homeTeam: 'required',
      awayTeam: 'required',
      homeTeamScore: 'required|integer',
      awayTeamScore: 'required|integer',
      matchDate: 'required',
      venue: 'required|string'
    };

    const validation = new Validator(req.body, rules);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors
      });
    }
    homeTeam = homeTeam.toLowerCase().trim();
    awayTeam = awayTeam.toLowerCase().trim();

    let foundHomeTeam, foundAwayTeam;
    try {
      foundHomeTeam = await Team.findOne({ name: homeTeam });
      foundAwayTeam = await Team.findOne({ name: awayTeam });
      if (!foundHomeTeam) {
        return res.status(400).json({
          status: 400,
          error: 'This home team does not exist'
        });
      }
      if (!foundAwayTeam) {
        return res.status(400).json({
          status: 400,
          error: 'This away team does not exist'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
    req.body.homeTeam = foundHomeTeam.name;
    req.body.awayTeam = foundAwayTeam.name;
    req.body.homeTeamScore = homeTeamScore;
    req.body.awayTeamScore = awayTeamScore;
    req.body.matchDate = matchDate;
    req.body.venue = venue;
    return next();
  },

  /** This functions checks whether a fixture with a particular id exists
 *  It also confirms if the creator of the fixture is the one trying to get it
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
  async getOneFixtureChecker(req, res, next) {
    const { fixtureId } = req.params;

    try {
      const fixture = await Fixture.findById({ _id: fixtureId }).cache(10);
      if (!fixture) {
        return res.status(404).json({
          status: 404,
          error: 'Fixture not found'
        });
      }
      // if (fixture) {
      //   eslint-disable-next-line no-underscore-dangle
      //   User can only get fixture he created
      //   if (fixture.user.toString() !== req.authData.payload._id) {
      //     return res.status(401).json({
      //       status: 401,
      //       error: 'You did not create this fixture'
      //     });
      //   }
      // }
      req.body.fixture = fixture;
      return next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
};
