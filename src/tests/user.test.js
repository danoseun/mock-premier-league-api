/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app';
import { User } from '../models';

beforeAll(async () => {
  await User.deleteMany();
});

describe('User endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/api/signup')
      .send({
        email: 'tayo@gmail.com',
        password: 'mypassword',
        firstname: 'firstname',
        lastname: 'lastname'
      });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  it('should not create a new user', async () => {
    const res = await request(app).post('/api/signup')
      .send({
        email: 'tayo@gmail.com',
        password: 'mypassword'
      });
    expect(res.status).toEqual(400);
    expect(res.body.error.firstname[0]).toBe('The firstname field is required.');
  });

  it('should allow user login', async () => {
    const res = await request(app).post('/api/login')
      .send({
        email: 'tayo@gmail.com',
        password: 'mypassword'
      });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should not allow user login', async () => {
    const res = await request(app).post('/api/login')
      .send({
        email: 'tayoki@gmail.com',
        password: 'mypassword'
      });
    expect(res.status).toEqual(401);
    expect(res.body.error).toBe('Authentication failed');
  });
});
