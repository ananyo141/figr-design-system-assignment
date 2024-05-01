import { config } from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  console.info('Using .env.docker');
  config();
} else if (process.env.NODE_ENV === 'test') {
  console.info('Using .env.test');
  config({ path: '.env.test' });
} else {
  config();
}

export const { PORT, NODE_ENV, ORIGIN, LOG_DIR, MONGO_URI } = process.env;
