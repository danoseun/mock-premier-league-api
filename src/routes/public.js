/* eslint-disable max-len */
import express from 'express';
import { fixtureController } from '../controllers';


const {
  viewCompletedFixtures, viewPendingFixtures, searchByHomeTeam, searchByAwayTeam, fixturesBeforeDate, fixturesAfterDate
} = fixtureController;

export const publicRouter = express.Router();

// fixtures
publicRouter.get('/completed', viewCompletedFixtures);
publicRouter.get('/pending', viewPendingFixtures);
publicRouter.get('/hometeam/:homeTeam', searchByHomeTeam);
publicRouter.get('/awayteam/:awayTeam', searchByAwayTeam);
publicRouter.get('/beforedate/:fixturesBeforeDate', fixturesBeforeDate);
publicRouter.get('/afterdate/:fixturesAfterDate', fixturesAfterDate);
