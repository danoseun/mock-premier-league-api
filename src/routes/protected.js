/* eslint-disable max-len */
import express from 'express';
import { teamValidator, getOneTeamChecker, fixtureValidator } from '../validations';
import { verifyToken, verifyAdmin } from '../middlewares/auth';
import { teamController, fixtureController } from '../controllers';


const {
  createTeam, getAllTeams, getOneTeam, editTeam, removeTeam
} = teamController;

const { validateFixture, getOneFixtureChecker } = fixtureValidator;

const {
  createFixture, getAllFixtures, getOneFixture, editFixture, removeFixture,
} = fixtureController;

export const protectedRouter = express.Router();

// teams
protectedRouter.post('/teams', verifyToken, verifyAdmin, teamValidator, createTeam);
protectedRouter.get('/teams', verifyToken, getAllTeams);
protectedRouter.get('/teams/:teamId', verifyToken, getOneTeamChecker, getOneTeam);
protectedRouter.put('/teams/:teamId', verifyToken, verifyAdmin, getOneTeamChecker, editTeam);
protectedRouter.delete('/teams/:teamId', verifyToken, verifyAdmin, removeTeam);

// fixtures
protectedRouter.post('/fixtures', verifyToken, verifyAdmin, validateFixture, createFixture);
protectedRouter.get('/fixtures', verifyToken, verifyAdmin, getAllFixtures);
protectedRouter.get('/fixtures/:fixtureId', verifyToken, verifyAdmin, getOneFixtureChecker, getOneFixture);
protectedRouter.put('/fixtures/:fixtureId', verifyToken, verifyAdmin, getOneFixtureChecker, editFixture);
protectedRouter.delete('/fixtures/:fixtureId', verifyToken, verifyAdmin, removeFixture);
