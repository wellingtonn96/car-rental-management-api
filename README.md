# Documentação do Projeto - Car Rental Management API

## 📋 Índice

- [Configuração do Ambiente](#configuração-do-ambiente)
- [Migrations](#migrations)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Comandos Disponíveis](#comandos-disponíveis)

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para configuração. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=car_rental
```

### Instalação de Dependências

```bash
npm install
```

## 📦 Migrations

As migrations são usadas para gerenciar o schema do banco de dados de forma versionada e controlada.

### Comandos de Migration

O projeto possui os seguintes comandos para gerenciar migrations:

#### 1. Criar Migration Manual

Cria um arquivo de migration vazio onde você pode escrever manualmente as alterações do banco de dados.

```bash
npm run migration:create NomeDaMigration
```

**Exemplo:**
```bash
npm run migration:create CreateUsersTable
```

**O que faz:**
- Cria um arquivo de migration em `src/shared/database/migrations/`
- O arquivo terá um timestamp e o nome fornecido
- Inclui métodos `up()` e `down()` para aplicar e reverter a migration

**Quando usar:**
- Quando você precisa de controle total sobre as alterações SQL
- Para migrations complexas que não podem ser geradas automaticamente
- Para alterações de dados (seeds, updates, etc.)

#### 2. Gerar Migration Automaticamente

Gera uma migration automaticamente comparando as entidades TypeORM com o estado atual do banco de dados.

```bash
npm run migration:generate NomeDaMigration
```

**Exemplo:**
```bash
npm run migration:generate AddEmailToUsers
```

**O que faz:**
- Conecta ao banco de dados
- Compara as entidades TypeORM com o schema atual
- Gera automaticamente os comandos SQL necessários
- Cria o arquivo de migration com as alterações detectadas

**Quando usar:**
- Quando você alterou as entidades TypeORM e quer sincronizar o banco
- Para gerar migrations baseadas em mudanças nas entidades
- Método recomendado para a maioria dos casos

**⚠️ Importante:**
- O banco de dados precisa estar rodando
- As variáveis de ambiente devem estar configuradas corretamente
- O TypeORM compara as entidades com o banco para detectar mudanças

#### 3. Executar Migrations

Executa todas as migrations pendentes no banco de dados.

```bash
npm run migration:run
```

**O que faz:**
- Conecta ao banco de dados
- Verifica quais migrations já foram executadas
- Executa todas as migrations pendentes em ordem
- Registra as migrations executadas na tabela `migrations`

**Quando usar:**
- Após criar ou gerar novas migrations
- Ao fazer deploy em um novo ambiente
- Para sincronizar o schema do banco com o código

#### 4. Reverter Migration

Reverte a última migration executada.

```bash
npm run migration:revert
```

**O que faz:**
- Executa o método `down()` da última migration
- Remove o registro da migration da tabela `migrations`
- Reverte as alterações feitas pela migration

**Quando usar:**
- Quando uma migration causou problemas
- Para testar o processo de rollback
- Durante desenvolvimento para desfazer alterações

**⚠️ Atenção:**
- Apenas a última migration pode ser revertida
- Certifique-se de que o método `down()` está implementado corretamente

### Estrutura de uma Migration

Uma migration típica tem a seguinte estrutura:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class NomeDaMigration1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Código para aplicar a migration
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          // ... outras colunas
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Código para reverter a migration
    await queryRunner.dropTable('users');
  }
}
```

### Localização dos Arquivos

- **Migrations:** `src/shared/database/migrations/`
- **Entidades:** `src/**/infra/typeorm/entities/`
- **Data Source:** `src/shared/database/data-source.ts`
- **Scripts:** `src/shared/database/scripts-database/`

### Fluxo de Trabalho Recomendado

1. **Fazer alterações nas entidades TypeORM**
   ```typescript
   // Exemplo: adicionar nova coluna em uma entidade
   @Column()
   email: string;
   ```

2. **Gerar a migration automaticamente**
   ```bash
   npm run migration:generate AddEmailColumn
   ```

3. **Revisar o arquivo de migration gerado**
   - Verificar se as alterações estão corretas
   - Ajustar se necessário

4. **Executar a migration**
   ```bash
   npm run migration:run
   ```

5. **Testar a aplicação**
   - Verificar se tudo está funcionando corretamente

### Dicas e Boas Práticas

1. **Sempre revise migrations geradas automaticamente**
   - O TypeORM pode não detectar todas as mudanças
   - Algumas alterações podem precisar de ajustes manuais

2. **Nunca edite migrations já executadas**
   - Crie uma nova migration para corrigir problemas
   - Editar migrations antigas pode causar inconsistências

3. **Teste o método `down()`**
   - Certifique-se de que a reversão funciona corretamente
   - Use `npm run migration:revert` para testar

4. **Mantenha migrations pequenas e focadas**
   - Uma migration por alteração lógica
   - Facilita revisão e rollback

5. **Use nomes descritivos**
   - `CreateUsersTable` ✅
   - `AddEmailToUsers` ✅
   - `Migration1` ❌

6. **Commit migrations junto com o código**
   - As migrations fazem parte do código
   - Permitem que outros desenvolvedores sincronizem o banco

### Resolução de Problemas

#### Erro: "Cannot find module"
- Verifique se o arquivo `.env` existe e está configurado
- Certifique-se de que as variáveis de ambiente estão corretas

#### Erro: "password authentication failed"
- Verifique as credenciais no arquivo `.env`
- Confirme que o banco de dados está rodando

#### Migration não detecta mudanças
- Certifique-se de que as entidades estão no caminho correto: `src/**/infra/typeorm/entities/`
- Verifique se os decorators TypeORM estão corretos
- Tente criar a migration manualmente

#### Erro ao reverter migration
- Verifique se o método `down()` está implementado
- Certifique-se de que apenas a última migration será revertida

## 📁 Estrutura do Projeto

```
src/
├── shared/
│   ├── database/
│   │   ├── migrations/          # Arquivos de migration
│   │   ├── scripts-database/    # Scripts de gerenciamento
│   │   ├── seeds/               # Seeds do banco de dados
│   │   ├── data-source.ts       # Configuração principal
│   │   └── data-source-cli.ts   # Configuração para CLI
│   ├── infra/
│   │   └── http/                # Servidor HTTP
│   └── ...
├── modules/
│   ├── accounts/
│   │   └── infra/
│   │       └── typeorm/
│   │           └── entities/   # Entidades TypeORM
│   └── cars/
│       └── infra/
│           └── typeorm/
│               └── entities/    # Entidades TypeORM
└── ...
```

## 🚀 Comandos Disponíveis

### Desenvolvimento

```bash
npm run dev              # Inicia o servidor em modo desenvolvimento
```

### Migrations

```bash
npm run migration:create <nome>    # Cria migration manual
npm run migration:generate <nome>  # Gera migration automaticamente
npm run migration:run              # Executa migrations pendentes
npm run migration:revert             # Reverte última migration
```

### Build e Testes

```bash
npm run build           # Compila o projeto
npm run test            # Executa testes
npm run lint            # Verifica código
npm run lint:fix        # Corrige problemas de lint
```

## 📝 Notas Adicionais

- Todas as migrations são versionadas com timestamp
- O TypeORM mantém um registro das migrations executadas
- As migrations são executadas em ordem cronológica
- Sempre faça backup antes de executar migrations em produção

