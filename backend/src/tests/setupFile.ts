// https://dev.to/shyamajp/testing-nodejsexpress-app-mongodb-with-jest-and-supertest-56ce
// https://www.freecodecamp.org/news/how-to-test-in-express-and-mongoose-apps/
// https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/
// https://www.velotio.com/engineering-blog/scalable-api-testing-framework-with-jest-and-supertest

import mongoose from 'mongoose';
import { User } from '../models/user';
import { mongoUri } from '../constants/exportEnv.constant';
import { initBucket } from '../utils/uploadToBucket';
import request from 'supertest';
import path from 'path';

import { app } from '../server';

export const agent = request.agent(app);
export const testImgPath = path.resolve(__dirname, './testimg.png')
export let usertoken: string;
export let admintoken: string;

const ADMIN_EMAIL = 'testadmin@mail.com';
const USER_EMAIL = 'testuser@mail.com';

beforeAll(async () => {
  // connect s3
  await initBucket();
  await mongoose.connect(mongoUri);
  await request(app).post('/createAdmin').send({
    email: ADMIN_EMAIL,
    password: 'secret',
    name: 'adminspider',
    address: 'dsafs asdf',
    mobile: '+917613115256',
    language: 'en',
    partNumber: 12,
  });
  await request(app).post('/auth/register').send({
    email: USER_EMAIL,
    password: 'secret',
    name: 'spider',
    address: 'dsafs asdf',
    mobile: '+917555533336',
    language: 'en',
    partNumber: 12,
  });

  const adminLoginResponse = await request(app).post('/auth/login/admin').send({
    email: ADMIN_EMAIL,
    password: 'secret',
  });
  const userLoginResponse = await request(app).post('/auth/login').send({
    email: USER_EMAIL,
    password: 'secret',
  });

  await mongoose.connection?.db.collection(User.collection.name).updateMany(
    { email: { $in: [ADMIN_EMAIL, USER_EMAIL] } }, // Filter criteria
    { $set: { verified: true } } // Update to be performed
  );

  admintoken = adminLoginResponse.body.data.token;
  usertoken = userLoginResponse.body.data.token;
});

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect();
});
