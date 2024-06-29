import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameLocationTable1719683590526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('location', 'locations');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('locations', 'location');
    }

}
