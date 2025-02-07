require('reflect-metadata');
const { DataSource } = require('typeorm');
const path = require('path');

// Initialize the DataSource
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWORD || 'database_ignite',
  database: process.env.DB_NAME || 'rentalx',
  entities: ['dist/modules/**/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  logging: true,
  migrationsTableName: 'history',
});

// Run migrations
(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    await AppDataSource.runMigrations();
    console.log('Migrations have been run successfully!');
  } catch (error) {
    console.error('Error during Data Source initialization or migration run:', error);
  } finally {
    await AppDataSource.destroy();
  }
})();
