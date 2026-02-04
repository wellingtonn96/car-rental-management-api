import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCars1770170753262 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicione suas alterações aqui
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Adicione a reversão das alterações aqui
  }
}
