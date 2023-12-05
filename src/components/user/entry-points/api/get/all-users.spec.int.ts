import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';
import { TestModule } from '../../../../../../test-setup';

describe('GET users', () => {
  jest.setTimeout(180_000);
  let server: request.SuperTest<request.Test>;
  let testModule: TestModule;
  beforeAll(async () => {
    testModule = await TestModule.init();
    server = testModule.getServer();
  });

  afterAll(async () => {
    await testModule.teardown();
  });

  it('should return all users', async () => {
    const response = await server
      .get('/users')
      .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
  });
});
