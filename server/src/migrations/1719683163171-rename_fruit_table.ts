import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameFruitTable1719683163171 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('fruit', 'fruits');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('fruits', 'fruit');
    }

}
