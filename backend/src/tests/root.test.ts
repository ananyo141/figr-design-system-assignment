import { usertoken, admintoken, agent } from './setupFile';

describe('Sanity Test', () => {
  describe('Server Running', () => {
    test('Checkhealth', async () => {
      const res = await agent.get('/');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeTruthy();
    });
  });

  describe('Check Tokens', () => {
    test('Tokens are non-empty', async () => {
      expect(usertoken).toBeTruthy();
      expect(admintoken).toBeTruthy();
    });
  });

  describe('Verified Users', () => {
    test('Check admin is verified', async () => {
      const adminResponse = await agent
        .get('/auth/profile')
        .set('Authorization', `Bearer ${admintoken}`);
      expect(adminResponse.statusCode).toEqual(200);
      expect(adminResponse.body.data?.verified).toEqual(true);
    });
    test('Check user is verified', async () => {
      const userResponse = await agent
        .get('/auth/profile')
        .set('Authorization', `Bearer ${usertoken}`);
      expect(userResponse.statusCode).toEqual(200);
      expect(userResponse.body.data?.verified).toEqual(true);
    });
  });
});
