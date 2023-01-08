import { join } from 'path';
import { DataSource } from 'typeorm';
import { config } from './config';

const DB_SETTINGS = config.get('database');
export const ApiDataSource = new DataSource({
  type: 'mysql',
  host: DB_SETTINGS.host,
  port: 3306,
  username: DB_SETTINGS.username,
  password: DB_SETTINGS.password,
  database: DB_SETTINGS.database,
  synchronize: DB_SETTINGS.synchronize,
  logger: 'debug',
  entities: [join(__dirname, 'entities/*{.js,.ts}')],
});
