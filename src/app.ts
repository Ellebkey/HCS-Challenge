import { dbConnection } from 'configs/mongoose';
import { connect } from 'mongoose';
import { logger } from '@utils/logger';
import csvController from '@controllers/csv.controller';

class App {
  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      logger.info(`===============Connecting to MongoDB==================`);
      await connect(dbConnection.url, dbConnection.options);
      logger.info(`===============Connected to MongoDB==================`);
    } catch (e) {
      logger.error(`===============Error on MongoDB==================`);
      logger.error(e);
    }
  }

  public run() {
    logger.info(`===============Running==================`);
    const foo = new csvController();
    foo.readAndSaveCSVData();
  }
}

const app = new App();
app.run();

export default App;
