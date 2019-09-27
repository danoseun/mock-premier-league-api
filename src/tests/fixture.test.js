/* eslint-disable no-undef */
import dotenv from 'dotenv';
import request from 'supertest';
import app from '../app';
import { Fixture, Team, User } from '../models';


dotenv.config();

let adminToken;
let userToken;

beforeAll(async () => {
  await User.deleteMany();
  await Team.deleteMany();
  await Fixture.deleteMany();
});

describe('Auth endpoints', () => {
  it('should create an admin user', async () => {
    const res = await request(app).post('/api/signup')
      .send({
        email: 'erapiece@gmail.com',
        password: 'mypassword',
        firstname: 'firstname',
        lastname: 'lastname',
        isAdmin: true
      });
    console.log('resbody1', res.body);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/api/signup')
      .send({
        email: 'loginaccount@gmail.com',
        password: 'mypassword',
        firstname: 'firstname',
        lastname: 'lastname'
      });
    console.log('resBody2', res.body);
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });


  it('should allow admin login', async () => {
    const res = await request(app).post('/api/login')
      .send({
        email: 'erapiece@gmail.com',
        password: 'mypassword'
      });
    expect(res.status).toEqual(200);
    adminToken = res.body.data.token;
  });

  it('should allow user login', async () => {
    const res = await request(app).post('/api/login')
      .send({
        email: 'loginaccount@gmail.com',
        password: 'mypassword'
      });
    expect(res.status).toEqual(200);
    userToken = res.body.data.token;
  });
});

describe('Fixture endpoints', () => {
  it('should allow admin create team', async () => {
    const res = await request(app).post('/api/teams')
      .set('authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Arsenal FC',
      });
    expect(res.status).toEqual(201);
  });

  it('should allow admin create another team', async () => {
    const res = await request(app).post('/api/teams')
      .set('authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Brescia',
      });
    expect(res.status).toEqual(201);
  });

  it('should allow admin create fixture', async () => {
    const res = await request(app).post('/api/fixtures')
      .set('authorization', `Bearer ${adminToken}`)
      .send({
        homeTeam: 'Arsenal FC',
        awayTeam: 'Brescia',
        homeTeamScore: 0,
        awayTeamScore: 0,
        matchDate: '2019-12-23',
        venue: 'Highbury'
      });
    expect(res.status).toEqual(201);
  });

  it('should not allow admin create fixture if either/both teams have not been created', async () => {
    const res = await request(app).post('/api/fixtures')
      .set('authorization', `Bearer ${adminToken}`)
      .send({
        homeTeam: 'Sydney FC',
        awayTeam: 'Lapapa Boys',
        homeTeamScore: 0,
        awayTeamScore: 0,
        matchDate: '2019-12-23',
        venue: 'Highbury'
      });
    expect(res.status).toEqual(400);
  });

  it('should not allow admin create fixture without token', async () => {
    const res = await request(app).post('/api/fixtures')
      .send({
        homeTeam: 'Arsenal FC',
        awayTeam: 'Brescia',
        homeTeamScore: 0,
        awayTeamScore: 0,
        matchDate: '2019-12-23',
        venue: 'Highbury'
      });
    expect(res.status).toEqual(403);
  });

  it('should not allow user create fixture with token', async () => {
    const res = await request(app).post('/api/fixtures')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        homeTeam: 'Brescia',
        awayTeam: 'Arsenal FC',
        homeTeamScore: 0,
        awayTeamScore: 0,
        matchDate: '2019-12-23',
        venue: 'Highbury'
      });
    expect(res.status).toEqual(401);
  });

  it('should allow admin get all fixtures', async () => {
    const res = await request(app).get('/api/teams')
      .set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(200);
  });

  it('should not allow user get all fixtures', async () => {
    const res = await request(app).get('/api/fixtures')
      .set('authorization', `Bearer ${adminToken}`);
    expect(res.status).toEqual(401);
  });
});
