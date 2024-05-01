import { mongoUri, nodeEnv } from '@constants/exportEnv.constant';
import { connect, set } from 'mongoose';

export async function initDb(): Promise<typeof import('mongoose')> {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!mongoUri) throw new Error('invalid mongodb URI');

  if (nodeEnv !== 'production') {
    set('debug', true);
  }

  const db = await connect(mongoUri);
  return db;
}
