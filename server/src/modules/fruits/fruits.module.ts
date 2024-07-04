import { Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './fruit.entity';
import { ConfigModule } from '@nestjs/config';
import fruityviceConfig from 'src/config/fruityvice.config';
import { FruityViceClient } from './clients/fruityvice.client';
import { HttpModule } from '@nestjs/axios';
import { FruitsRepository } from './fruits.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Fruit]),
        ConfigModule.forRoot({
            load: [fruityviceConfig]
        }),
        HttpModule,
    ],
    providers: [
        FruitsService,
        FruitsRepository,
        FruityViceClient,
    ],
    exports: [FruitsService]
})
export class FruitsModule { }
