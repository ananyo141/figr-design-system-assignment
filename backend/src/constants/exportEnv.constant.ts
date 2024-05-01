/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { PORT, NODE_ENV, ORIGIN, LOG_DIR, MONGO_URI } from './env.constant';

export const port = PORT as string;
export const origin = ORIGIN as string;
export const nodeEnv = NODE_ENV as string;
export const logDir = LOG_DIR as string;
export const mongoUri = MONGO_URI as string;
