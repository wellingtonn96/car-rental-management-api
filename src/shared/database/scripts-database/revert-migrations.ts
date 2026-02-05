import dotenv from 'dotenv';

import { AppDataSourceRunScripts } from './data-sourse-scripts';
import 'reflect-metadata';

dotenv.config();

// Run migrations
// Reverte a última migration
(async () => {
  try {
    await AppDataSourceRunScripts.initialize();
    console.log('✅ Data Source inicializado!');

    console.log('⏪ Revertendo última migration...');
    await AppDataSourceRunScripts.undoLastMigration();
    console.log('✅ Migration revertida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao reverter a migration:', error);
  } finally {
    await AppDataSourceRunScripts.destroy();
  }
})();
