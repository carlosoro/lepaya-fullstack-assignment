import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameLedgerTable1719683583951 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('ledger', 'ledgers');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable('ledgers', 'ledger');
    }

}
