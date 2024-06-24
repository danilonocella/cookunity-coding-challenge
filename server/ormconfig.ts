import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PGUSER,
  port: parseInt(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
  logging: true,
};
