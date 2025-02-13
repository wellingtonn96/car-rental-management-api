import { AppDataSourceRunScripts } from './data-sourse-scripts';

require('reflect-metadata');

// Run migrations
(async () => {
  try {
    await AppDataSourceRunScripts.initialize();
    console.log('✅ Data Source has been initialized!');

    console.log(
      '📂 Migrations path:',
      AppDataSourceRunScripts.options.migrations
    );

    await AppDataSourceRunScripts.runMigrations();
    console.log('🚀 Migrations have been run successfully!');
  } catch (error) {
    console.error(
      '❌ Error during Data Source initialization or migration run:',
      error
    );
  } finally {
    await AppDataSourceRunScripts.destroy();
  }
})();
