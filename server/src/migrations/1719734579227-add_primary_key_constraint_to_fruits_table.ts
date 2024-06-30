import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrimaryKeyConstraintToFruitsTable1719734579227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createPrimaryKey("fruits", ["id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey("fruits");
    }

}
