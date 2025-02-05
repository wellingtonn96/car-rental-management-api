import { DataSource } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

const seedCategories = async (dataSource: DataSource) => {
  await dataSource.initialize();

  console.log('🔄 Conectado ao banco de dados!');

  // Exibe o nome do banco de dados atual
  const dbName = await dataSource.query(
    `SELECT current_database() AS database_name;`
  );
  console.log('📌 Banco de dados:', dbName[0].database_name);

  // Lista todas as tabelas no banco de dados
  const tables = await dataSource.query(
    `SELECT tablename FROM pg_tables WHERE schemaname = 'public';`
  );
  console.log(
    '📂 Tabelas encontradas:',
    tables.map((t: any) => t.tablename)
  );

  // Insere os registros na tabela categories
  await dataSource.query(`
    INSERT INTO categories (id, name, description, created_at)
    VALUES ('${uuidV4()}', 'SUV', 'Categoria de carros SUV', NOW()),
           ('${uuidV4()}', 'Sedan', 'Categoria de carros Sedan', NOW());
  `);

  console.log('✅ Categorias inseridas com sucesso!');

  // Faz um SELECT para exibir os dados inseridos
  const categories = await dataSource.query(`SELECT * FROM categories;`);
  console.log('📋 Categorias na tabela:', categories);

  await dataSource.destroy();
};

export default seedCategories;
