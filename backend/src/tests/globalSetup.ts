import mongoose from 'mongoose';

import { mongoUri } from '../constants/exportEnv.constant';

export default async function globalSetup() {
  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(mongoUri);
  await mongoose.connection?.db.dropDatabase();
  await mongoose.disconnect();
}
