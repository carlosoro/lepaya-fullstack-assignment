import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from './entities/ledger.entity';
import { LedgersService } from './ledgers.service';
import { LedgersRepository } from './ledgers.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Ledger])],
    providers: [LedgersService, LedgersRepository],
    exports: [LedgersService]
})
export class LedgersModule {}
