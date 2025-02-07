import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost', // Use environment variables for flexibility
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWORD || 'database_ignite',
  database: process.env.DB_NAME || 'rentalx',
  entities: ['src/modules/**/entities/*.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false, // Always use migrations in production
  logging: true, // Enable logging for debugging
  migrationsTableName: 'history'
});

// To create migrations
// npx typeorm migration:create -n ./src/database/migrations/CreateSpecifications

// To revert migrations
//  npx typeorm migration:revert -d ./src/database/data-source.ts

// To run migrations
//  npx typeorm migration:run -d ./src/database/data-source.ts
