import { Module } from '@nestjs/common';
import { FruitsController } from './fruits.controller';
import { FruitsService } from './fruits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './fruit.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Fruit])],
    controllers: [FruitsController],
    providers: [FruitsService]
})
export class FruitsModule { }
