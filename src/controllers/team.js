/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
import { Team } from '../models';


export const teamController = {
  /**
     * Admin create team on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */

  async createTeam(req, res) {
    const { name } = req.body;
    const { _id } = req.authData.payload;
    try {
      const result = await new Team({
        user: _id,
        name
      }).save();
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
     * Admin get all teams on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async getAllTeams(req, res) {
    try {
      const teams = await Team.find().limit(10);
      return res.status(200).json({
        status: 200,
        data: teams
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin get single team by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async getOneTeam(req, res) {
    const { team } = req.body;
    return res.status(200).json({
      status: 200,
      data: team
    });
  },

  /**
     * Admin update team by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async editTeam(req, res) {
    let { team, name } = req.body;
    if (!name || !name.trim() === '') {
      return res.status(400).json({
        status: 400,
        error: 'Add the team name'
      });
    }
    name = name.toLowerCase();
    const foundName = await Team.findOne({ name });

    if (foundName) {
      return res.status(409).json({
        status: 409,
        error: `${name} already exists, consider choosing another name`
      });
    }
    try {
      team.name = name;
      await team.save();
      return res.status(200).json({
        status: 200,
        data: 'Team information successfully updated'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  },

  /**
     * Admin delete team by id on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof adminTeamController object
     */
  async removeTeam(req, res) {
    const { teamId } = req.params;
    try {
      const team = await Team.findByIdAndDelete({ _id: teamId }).exec();
      console.log('team', team);
      if (!team) {
        return res.status(404).json({
          status: 404,
          error: 'Team not found'
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'Team successfully deleted'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
};
