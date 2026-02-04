import { exec } from 'child_process';
import dotenv from 'dotenv';
import { promisify } from 'util';

dotenv.config();

const execAsync = promisify(exec);

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Erro: Você deve fornecer um nome para a migration!');
  console.error('Uso: npm run migration:generate NomeDaMigration');
  process.exit(1);
}

// Gerar migration automaticamente baseado nas mudanças das entidades
(async () => {
  try {
    console.log('🔄 Conectando ao banco de dados...');

    // Usar o TypeORM CLI para gerar a migration
    // O TypeORM precisa que o data-source seja exportado como dataSource
    const command = `npx ts-node-dev -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d src/shared/database/data-source-cli.ts src/shared/database/migrations/${migrationName}`;

    console.log('🚀 Gerando migration baseada nas entidades...');
    console.log(`📝 Nome da migration: ${migrationName}`);

    const { stdout, stderr } = await execAsync(command, {
      cwd: process.cwd(),
      env: { ...process.env }
    });

    if (stderr && !stderr.includes('Migration')) {
      console.warn('⚠️ Aviso:', stderr);
    }

    if (stdout) {
      console.log(stdout);
    }

    console.log('✅ Migration gerada com sucesso!');
  } catch (error: any) {
    if (error.stdout) {
      console.log(error.stdout);
    }
    if (error.stderr) {
      console.error('❌ Erro:', error.stderr);
    } else {
      console.error('❌ Erro ao gerar migration:', error.message);
    }
    process.exit(1);
  }
})();
