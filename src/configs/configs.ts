import { resolve } from 'path';
import joi from 'joi';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

const envVarsSchema = joi
  .object({
    NODE_ENV: joi.string().allow(['development', 'production', 'test']).default('development'),
    PORT: joi.number().default(3000),
    MONGO_HOST: joi.string().required().description('SQL DB host url'),
    MONGO_DB: joi.string().required().description('SQL DB name'),
    MONGO_USER: joi.string().required().description('SQL DB user'),
    MONGO_PASSWORD: joi.string().required().description('SQL DB password'),
    MONGO_PORT: joi.number().default(27017),
  })
  .unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envConfig = {
  env: envVars.NODE_ENV,
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
    user: envVars.MONGO_USER,
    password: envVars.MONGO_PASSWORD,
    db: envVars.MONGO_DB,
  },
};
