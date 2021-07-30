import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { logger } from '../middlewares/logger';
import {Category} from '../entities/examples/manyToMany/Category';
import {Question} from '../entities/examples/manyToMany/Question';
import {Student} from '../entities/examples/oneToOne/Student';
import {Profile} from '../entities/examples/oneToOne/Profile';
import {Car} from '../entities/examples/oneToMany/Car';
import {Owner} from '../entities/examples/oneToMany/Owner';

type DB_TYPE = 'postgres';

export const initDbConnection = async () => {
  try {
    const { TYPEORM_CONNECTION, TYPEORM_HOST, TYPEORM_PORT, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE } =
      process.env;
/*
    PORT = 5000
    ENVIRONMENT_NAME = DEV
    TYPEORM_CONNECTION = postgres
    TYPEORM_HOST = shop-postgres
    TYPEORM_USERNAME = postgres
    TYPEORM_PASSWORD = secret
    TYPEORM_DATABASE = shop-db
    TYPEORM_PORT = 5432
    TYPEORM_SYNCHRONIZE = true
    TYPEORM_LOGGING = true
*/


    await createConnection({
      type: TYPEORM_CONNECTION as DB_TYPE,
      host: TYPEORM_HOST,
      port: parseInt(TYPEORM_PORT),
      username: TYPEORM_USERNAME,
      password: TYPEORM_PASSWORD,
      database: TYPEORM_DATABASE,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [Category, Question, Student, Profile, Car, Owner],
      synchronize: true,
      logging: true,
    });

    logger.info(`Db is up and running s on port: ${TYPEORM_PORT}`);
    return;
  } catch (err) {
    logger.error('err while connecting with db = ', err);
    return err;
  }
};
