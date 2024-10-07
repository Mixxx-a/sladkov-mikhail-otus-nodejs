import request from 'supertest'

import { app, server } from '../src/app'

describe('App tests', () => {

  afterAll(() => {
    server.close()
  })


  it('responds on /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
  });

  it('responds on /book', async () => {
    const response = await request(app).get('/book');
    expect(response.status).toEqual(200);
  });

  it('responds on /book/create', async () => {
    const response = await request(app).get('/book/create');
    expect(response.status).toEqual(200);
  });
  
  it('responds on /book/edit', async () => {
    const response = await request(app).get('/book/edit');
    expect(response.status).toEqual(200);
  });

  it('responds on /login', async () => {
    const response = await request(app).get('/login');
    expect(response.status).toEqual(200);
  });
});