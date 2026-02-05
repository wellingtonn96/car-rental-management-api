import 'reflect-metadata';
import dotenv from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

// Detectar se está em produção (arquivos compilados) ou desenvolvimento
const isProduction = process.env.NODE_ENV === 'production';

// Em produção, usar caminhos relativos ao dist
// Em desenvolvimento, usar caminhos do src
const entitiesPath = isProduction
  ? [path.join(process.cwd(), 'dist/**/infra/typeorm/entities/*.js')]
  : ['src/**/infra/typeorm/entities/*.ts'];

const migrationsPath = isProduction
  ? [path.join(process.cwd(), 'dist/shared/database/migrations/*.js')]
  : ['src/shared/database/migrations/*.ts'];

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  entities: entitiesPath,
  migrations: migrationsPath,
  synchronize: false,
  logging: !isProduction
});
