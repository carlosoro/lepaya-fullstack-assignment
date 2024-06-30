import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from './entities/ledger.entity';
import { LedgersService } from './ledgers.service';

@Module({
    imports: [TypeOrmModule.forFeature([Ledger])],
    providers: [LedgersService],
    exports: [LedgersService]
})
export class LedgersModule {}
