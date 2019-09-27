/* eslint-disable no-underscore-dangle */
import Validator from 'validatorjs';
import { Team } from '../models';


/** This functions validates team name
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
export const teamValidator = async (req, res, next) => {
  let { name } = req.body;
  const rule = {
    name: 'required|min:2|string'
  };

  const validation = new Validator(req.body, rule);
  if (validation.fails()) {
    return res.status(400).json({
      status: 400,
      error: validation.errors.errors
    });
  }
  name = name.toLowerCase().trim();
  try {
    const foundTeam = await Team.findOne({ name });
    if (foundTeam) {
      return res.status(400).json({
        status: 400,
        error: `${name} already exists`
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message
    });
  }
  req.body.name = name;
  return next();
};

/** This functions checks whether a team with a particular id exists
 *  It also confirms if the creator of the team is the one trying to get it
      * @param {object} req - The request object
      * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
*/
export const getOneTeamChecker = async (req, res, next) => {
  const { teamId } = req.params;
  // teamId = Number(teamId);
  try {
    const result = await Team.findById({ _id: teamId });
    if (!result) {
      return res.status(404).json({
        status: 404,
        error: 'Team not found'
      });
    }
    if (result) {
      console.log('result', result);
      // eslint-disable-next-line no-underscore-dangle
      if (result.user.toString() !== req.authData.payload._id) {
        return res.status(401).json({
          status: 401,
          error: 'You did not create this team'
        });
      }
    }
    req.body.team = result;
    return next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message
    });
  }
};
