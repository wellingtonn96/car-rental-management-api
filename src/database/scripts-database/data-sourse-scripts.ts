import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSourceRunScripts = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWORD || 'database_ignite',
  database: process.env.DB_NAME || 'rentalx',
  entities: ['src/modules/**/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true
});
