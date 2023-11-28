import supertest from 'supertest';
import { web } from '../src/application/web.js';
import { createTestUser, getTestUser, removeTestUser } from './test-util.js';
import { logger } from '../src/application/logging.js';

describe('POST /api/users', () => {
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can register new user', async () => {
    const result = await supertest(web)
      .post('/api/users')
      .send({
        username: 'test',
        password: 'test',
        accountType: 'user',
        name: 'test',
      });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
    expect(result.body.data.accountType).toBe('user');
    expect(result.body.data.password).toBeUndefined();
  });
});

describe('POST /api/users/login', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'test',
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe('test');
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'test',
        password: 'salah',
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if username is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        username: 'salah',
        password: 'salah',
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/users/current', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.name).toBe('test');
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', 'salah');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /api/users/logout', () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can logout', async () => {
    const result = await supertest(web)
      .delete('/api/users/logout')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data).toBe('OK');

    const user = await getTestUser();
    expect(user.token).toBeNull();
  });

  it('should reject logout if token is invalid', async () => {
    const result = await supertest(web)
      .delete('/api/users/logout')
      .set('Authorization', 'salah');

    expect(result.status).toBe(401);
  });
});
