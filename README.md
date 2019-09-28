# mock-premier-league-api
An API that serves the latest scores of fixtures of matches in a “Mock Premier League”

[![Build Status](https://travis-ci.org/danoseun/mock-premier-league-api.svg?branch=master)](https://travis-ci.org/danoseun/mock-premier-league-api)

## Features

**Admin accounts**
- signup/login
- manage teams (add, remove, edit, view)
- create fixtures (add, remove, edit, view)
- Generate unique links for fixture

**Users accounts**

- signup/login
- view teams
- view completed fixtures
- view pending fixtures
- search fixtures/teams

## Technologies

- NodeJs
- MongoDB/Mongoose
- Redis
- Docker
- POSTMAN
- Jest
- Express

## Requirements and Installation

To install and run this project you would need to have Node.js installed.

- Create a .env file in the root directory of the cloned project and add the following:
  - mongodb connection=
  - SECRETKEY=
  - ROUNDS=<Number of rounds to hash password>
  - REDIS_LINK=

- To run:

```sh
git clone the repository
cd mock-premier-league-api
npm install
npm run start:dev
```

## Testing

```sh
npm test
```


## To interact with the APIs, the following should be noted:

  - An admin account has already been created to access admin protected endpoints.
  
  - Only created eams can be added to a fixture. Any attempt to add a team not created will throw an error.
  
  - The date format to be used to interact with the API is 2019-09-26(YEAR-MONTH-DAY).
  
  - Only the homeTeamScore and awayTeamScore fields have been exposed for the update fixture endpoint.
  
  - The API documentation on POSTMAN carries these details too.
  
## API-ENDPOINTS

   ## USERS
   
`- POST /api/signup Create user account`

`- POST /api/login Login a user`

   ## TEAMS

`- POST /api/teams ## Only Admin can add a team`

`- GET /api/teams View all teams`

`- GET /api/teams/:teamId View a single team`

`- PUT /api/teams/:teamId ## Only Admin can edit a team`

`- DELETE /api/teams/:teamId ## Only Admin can remove team`

   ## FIXTURES

`- POST /api/fixtures ## Only Admin can add a fixture`

`- GET /api/fixtures ## Only Admin can view all fixtures`

`- GET /api/fixtures/:fixtureId  ## Only Admin can view a single fixture`

`- PUT /api/fixtures/:fixtureId ## Only Admin can update fixture`

`- DELETE /api/fixtures/:fixtureId ## Only Admin can remove fixture`

   ## SEARCH ROUTES FOR ALL USERS(PUBLIC).
   
   `- GET /api/completed Users can view all completed fixtures`
   
   `- GET /api/pending Users can view all pending fixtures`
    
   `- GET /api/hometeam/:homeTeam Users can search by home teams`
   
   `- GET /api/awayteam/:awayTeam Users can search by away teams`
   
   `- GET /api/beforedate/:fixturesBeforeDate Users view all fixtures before a particular date`
   
   `- GET /api/afterdate/:fixturesAfterDate Users view all fixtures after a particular date`
   

## API

The API is hosted on AWS(Amazon Web Services)
[http://sterling-backend.us-east-2.elasticbeanstalk.com/api](http://sterling-backend.us-east-2.elasticbeanstalk.com/api)

## API Documentation

[https://documenter.getpostman.com/preview/2851236-f79758e3-c124-4117-8f2e-926891355794?versionTag=latest&apiName=CURRENT&version=latest&top-bar=ffffff&right-sidebar=303030&highlight=ef5b25](https://documenter.getpostman.com/preview/2851236-f79758e3-c124-4117-8f2e-926891355794?versionTag=latest&apiName=CURRENT&version=latest&top-bar=ffffff&right-sidebar=303030&highlight=ef5b25)

## Author

Oluwaseun Somefun
