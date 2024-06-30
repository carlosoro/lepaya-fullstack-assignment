import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from './entities/ledger.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ledger])],
})
export class PurchasesModule {}
