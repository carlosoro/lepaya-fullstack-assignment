import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFruitIdColumnTypeFromLedgersTable1719683723750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.ledgers ALTER COLUMN fruit_id TYPE int4 USING fruit_id::int4`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE public.ledgers ALTER COLUMN fruit_id TYPE varchar USING fruit_id::varchar`);
    }

}
