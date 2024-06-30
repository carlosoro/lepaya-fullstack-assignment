import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrimaryColumnIdToLedgersTable1719731958111 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledgers" ADD COLUMN "id" SERIAL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledgers" DROP COLUMN "id"`);
    }

}
