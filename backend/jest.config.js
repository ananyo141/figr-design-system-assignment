const path = require('path');

module.exports = {
  globalSetup: './src/tests/globalSetup.ts',
  globalTeardown: './src/tests/globalTeardown.ts',
  setupFilesAfterEnv: ['./src/tests/setupFile.ts'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '^@constants/(.*)$': path.resolve('./src/constants/$1'),
    '^@database/(.*)$': path.resolve('./src/database/$1'),
    '^@models/(.*)$': path.resolve('./src/models/$1'),
    '^@services/(.*)$': path.resolve('./src/services/$1'),
    '^@tests/(.*)$': path.resolve('./src/tests/$1'),
    '^@utils/(.*)$': path.resolve('./src/utils/$1'),
    '^@middlewares/(.*)$': path.resolve('./src/middlewares/$1'),
    '^@routes/(.*)$': path.resolve('./src/routes/$1'),
    '^@controllers/(.*)$': path.resolve('./src/controllers/$1'),
    '^@types/(.*)$': path.resolve('./src/types/$1'),
    '^@errors/(.*)$': path.resolve('./src/errors/$1'),
    '^@config/(.*)$': path.resolve('./src/config/$1'),
    '^@schema/(.*)$': path.resolve('./src/schema/$1'),
  },
};
