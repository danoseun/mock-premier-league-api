/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';


describe('App js', () => {
  it('should display a welcome message successfully', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual('Welcome to the mock premier league API');
  });

  it('should return 404 if route is not found', async () => {
    const res = await request(app).get('*');
    expect(res.status).toEqual(404);
    expect(res.body.error).toEqual('Sorry, page not found!');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
