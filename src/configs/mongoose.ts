import { envConfig } from './configs';

const { host, port, db, user, password } = envConfig.mongo;

export const dbConnection = {
  url: `mongodb://${user}:${password}@${host}:${port}/${db}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
