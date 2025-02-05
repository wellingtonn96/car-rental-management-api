import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres', // Database type (PostgreSQL in your case)
  host: 'localhost', // Host name
  port: 5432, // Port
  username: 'docker', // Username
  password: 'database_ignite', // Password
  database: 'rentalx', // Database name
  migrations: ['src/database/migrations/*.ts'], // Path to migrations
  synchronize: false, // Don't synchronize in production
  logging: true // Optional, enable logging
});
