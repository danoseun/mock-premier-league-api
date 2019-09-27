/* eslint-disable prefer-const */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import MongooseCache from 'mongoose-redis';
import uuidv4 from 'uuid/v4';
import { Fixture } from '../models';

dotenv.config();
const redisLink = process.env.REDIS_LINK;


let cache = MongooseCache(mongoose, redisLink);


export const fixtureController = {
  /**
     * Admin create fixture on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async createFixture(req, res) {
    const {
      homeTeam, awayTeam, homeTeamScore, awayTeamScore, matchDate, venue
    } = req.body;
    //const { _id } = req.authData.payload;


    const url = req.originalUrl;
    const link = `${url}/${uuidv4() + Math.random().toString(36).substr(2) + uuidv4()}`;
    const newFixture = new Fixture({
      //user: _id,
      homeTeam,
      awayTeam,
      homeTeamScore,
      awayTeamScore,
      matchDate,
      venue,
      link
    });

    try {
      const result = await newFixture.save();
      return res.status(201).json({
        status: 201,
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin can get all fixtures on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */

  async getAllFixtures(req, res) {
    try {
      const fixtures = await Fixture.find().limit(10).cache(10);
      if(fixtures.length === 0) {
        return res.status(404).json({
          status: 404,
          data: 'There are no fixtures at this time'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },

  /**
     * Admin can get a single fixture on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async getOneFixture(req, res) {
    const { fixture } = req.body;
    return res.status(200).json({
      status: 200,
      data: fixture
    });
  },
  /**
     * Admin can edit fixture on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async editFixture(req, res) {
    let {
      fixture, homeTeamScore, awayTeamScore
    } = req.body;

    if (!homeTeamScore || homeTeamScore.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Hometeam score should be stated'
      });
    }
    if (!awayTeamScore || awayTeamScore.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Away team score should be stated'
      });
    }
    if(isNaN(homeTeamScore) || isNaN(awayTeamScore)) {
      return res.status(400).json({
        status: 400,
        error: 'hometeam scores and awayteam scores should be numbers'
      });
    }
    fixture.homeTeamScore = homeTeamScore;
    fixture.awayTeamScore = awayTeamScore;

    try {
      let updatedFixture = await fixture.save();
      console.log('updatedfixture', updatedFixture);
      return res.status(200).json({
        status: 200,
        data: updatedFixture
      });
    } catch (error) {
      console.log('error', error);
      return res.status(200).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin delete fixture by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async removeFixture(req, res) {
    const { fixtureId } = req.params;
    try {
      const fixture = await Fixture.findByIdAndDelete({ _id: fixtureId }).exec();
      if (!fixture) {
        return res.status(404).json({
          status: 404,
          error: 'Fixture not found'
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'Fixture successfully deleted'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },

  // PUBLIC ROUTES
  /**
     * Users(ROBUST SEARCH) can view completed fixtures on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async viewCompletedFixtures(req, res) {
    try {
      const fixtures = await Fixture.find({ pending: false }).cache(10);
      if (fixtures.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no completed fixtures at the momemnt'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },

  /**
     * Users(ROBUST SEARCH) can view pending fixtures on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async viewPendingFixtures(req, res) {
    try {
      const fixtures = await Fixture.find({ pending: true }).cache(10);
      if (fixtures.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no pending fixtures at the momemnt'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  },

  /**
     * Robust search(PUBLIC ROUTE)by homeTeam on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof fixtureController object
     */
  async searchByHomeTeam(req, res) {
    let { homeTeam } = req.params;
    homeTeam = homeTeam.toLowerCase().trim();
    try {
      const foundHomeTeams = await Fixture.find({ homeTeam }).limit(10).cache(10800);
      if (foundHomeTeams.length !== 0) {
        return res.status(200).json({
          status: 200,
          data: foundHomeTeams
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'No home team with that name yet'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
       * Robust search(PUBLIC ROUTE)by away team on the application
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof fixtureController object
       */
  async searchByAwayTeam(req, res) {
    const { awayTeam } = req.params;
    try {
      const foundAwayTeams = await Fixture.find({ awayTeam }).limit(10).cache(10800);
      if (foundAwayTeams.length !== 0) {
        return res.status(200).json({
          status: 200,
          data: foundAwayTeams
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'No away team with that name yet'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
       * Robust search(PUBLIC ROUTE)for fixtures before the match date
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success
       * @memeberof fixtureController object
       */
  async fixturesBeforeDate(req, res) {
    const { fixturesBeforeDate } = req.params;
    try {
      const fixtures = await Fixture.find({ matchDate: { $lt: fixturesBeforeDate } }).cache(10800);
      console.log('fixturesB', fixtures);
      if (fixtures.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no fixtures before this date'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures
      });
    } catch (error) {
      return res.status(500).jaon({
        status: 500,
        error: error.message
      });
    }
  },

  /**
       * Robust search(PUBLIC ROUTE)for fixtures before the match date
       * @static
       * @param {object} req - The request object
       * @param {object} res - The response object
       * @return {object} JSON object representing success/error
       * @memeberof fixtureController object
       */
  async fixturesAfterDate(req, res) {
    const { fixturesAfterDate } = req.params;
    try {
      const fixtures = await Fixture.find({ matchDate: { $gt: fixturesAfterDate } }).cache(10800);
      console.log('fixturesC', fixtures);
      if (fixtures.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no fixtures after this date'
        });
      }
      return res.status(200).json({
        status: 200,
        data: fixtures
      });
    } catch (error) {
      return res.status(500).jaon({
        status: 500,
        error: error.message
      });
    }
  }
};
