import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultDateToLedgersTable1720120677412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledgers" ALTER COLUMN "time" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ledgers" ALTER COLUMN "time" DROP DEFAULT`);
    }

}
