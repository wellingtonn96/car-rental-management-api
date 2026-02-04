import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Erro: Você deve fornecer um nome para a migration!');
  console.error('Uso: npm run migration:create NomeDaMigration');
  process.exit(1);
}

// Criar a migration manualmente (arquivo vazio)
(async () => {
  try {
    const timestamp = Date.now();
    const migrationFileName = `${timestamp}-${migrationName}`;
    const migrationPath = `src/shared/database/migrations/${migrationFileName}.ts`;

    const className = migrationName
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    const migrationTemplate = `import { MigrationInterface, QueryRunner } from 'typeorm';

export class ${className}${timestamp} implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicione suas alterações aqui
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Adicione a reversão das alterações aqui
  }
}
`;

    const fullPath = path.join(process.cwd(), migrationPath);
    const dir = path.dirname(fullPath);

    // Criar diretório se não existir
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Criar arquivo de migration
    fs.writeFileSync(fullPath, migrationTemplate, 'utf8');

    console.log('✅ Migration criada com sucesso!');
    console.log(`📁 Arquivo: ${migrationPath}`);
  } catch (error) {
    console.error('❌ Erro ao criar migration:', error);
    process.exit(1);
  }
})();
