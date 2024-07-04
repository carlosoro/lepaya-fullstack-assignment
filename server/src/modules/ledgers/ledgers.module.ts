import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from './entities/ledger.entity';
import { LedgersService } from './ledgers.service';
import { LedgersRepository } from './ledgers.repository';
import { LedgersController } from './ledgers.controller';
import { FruitsModule } from './../fruits/fruits.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ledger]),
        FruitsModule,
        LocationsModule
    ],
    providers: [LedgersService, LedgersRepository],
    exports: [LedgersService],
    controllers: [LedgersController]
})
export class LedgersModule {}
