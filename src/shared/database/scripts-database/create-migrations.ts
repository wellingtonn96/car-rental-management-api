import exec from 'child_process';
import dotenv from 'dotenv';

import { AppDataSourceRunScripts } from './data-sourse-scripts';

import 'reflect-metadata';

dotenv.config();

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Erro: Você deve fornecer um nome para a migration!');
  console.error('Uso: node create-migration.js NomeDaMigration');
  process.exit(1);
}

// Criar a migration
(async () => {
  try {
    await AppDataSourceRunScripts.initialize();
    console.log('✅ Data Source has been initialized!');

    // Comando para gerar a migration
    const { exec } = require('child_process');
    const migrationCommand = `npx typeorm migration:create src/modules/shared/database/migrations/${migrationName}`;

    console.log('🚀 Criando migration:', migrationName);
    console.log('Executando:', migrationCommand);

    exec(migrationCommand, (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error('❌ Erro ao criar migration:', error.message);
        return;
      }
      if (stderr) {
        console.error('⚠️ Alerta:', stderr);
      }
      console.log('✅ Migration criada com sucesso:', stdout);
    });
  } catch (error) {
    console.error('❌ Error during Data Source initialization:', error);
  } finally {
    await AppDataSourceRunScripts.destroy();
  }
})();
