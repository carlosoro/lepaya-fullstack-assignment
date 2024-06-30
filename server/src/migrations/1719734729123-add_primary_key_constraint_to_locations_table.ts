import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrimaryKeyConstraintToLocationsTable1719734729123 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createPrimaryKey("locations", ["id"]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropPrimaryKey("locations");
    }

}
