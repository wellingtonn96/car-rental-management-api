import { v4 as uuidV4 } from 'uuid';

import { AppDataSourceRunScripts } from '../scripts-database/data-sourse-scripts';

(async () => {
  try {
    // Initialize database connection
    await AppDataSourceRunScripts.initialize();
    console.log('🔄 Conectado ao banco de dados!');

    // Exibe o nome do banco de dados atual
    const dbName = await AppDataSourceRunScripts.query(
      `SELECT current_database() AS database_name;`
    );
    console.log('📌 Banco de dados:', dbName[0].database_name);

    // Lista todas as tabelas no banco de dados
    const tables = await AppDataSourceRunScripts.query(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
    );
    console.log(
      '📂 Tabelas encontradas:',
      tables.map((t: any) => t.tablename)
    );

    // Insere os registros na tabela categories
    const insertQuery = `
      INSERT INTO categories (id, name, description, created_at)
      VALUES ($1, $2, $3, NOW()),
             ($4, $5, $6, NOW());
    `;
    const values = [
      uuidV4(),
      'SUV',
      'Categoria de carros SUV',
      uuidV4(),
      'Sedan',
      'Categoria de carros Sedan'
    ];

    await AppDataSourceRunScripts.query(insertQuery, values);

    console.log('✅ Categorias inseridas com sucesso!');

    // Faz um SELECT para exibir os dados inseridos
    const categories = await AppDataSourceRunScripts.query(
      `SELECT * FROM categories;`
    );
    console.log('📋 Categorias na tabela:', categories);
  } catch (error) {
    console.error('❌ Ocorreu um erro:', error);
  } finally {
    // Ensure to close the connection
    await AppDataSourceRunScripts.destroy();
  }
})();
