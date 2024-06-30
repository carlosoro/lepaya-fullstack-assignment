import { Module } from '@nestjs/common';
import { FruitsController } from './fruits.controller';
import { FruitsService } from './fruits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './fruit.entity';
import { LedgersModule } from 'src/ledgers/ledgers.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Fruit]),
        LedgersModule
    ],
    controllers: [FruitsController],
    providers: [FruitsService]
})
export class FruitsModule { }
