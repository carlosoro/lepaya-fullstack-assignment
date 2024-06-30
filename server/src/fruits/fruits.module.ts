import { Module } from '@nestjs/common';
import { FruitsController } from './fruits.controller';
import { FruitsService } from './fruits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './fruit.entity';
import { LedgersModule } from 'src/ledgers/ledgers.module';
import { LocationsModule } from 'src/locations/locations.module';
import { ConfigModule } from '@nestjs/config';
import fruityviceConfig from 'src/config/fruityvice.config';
import { FruityViceClient } from './clients/fruityvice.client';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forFeature([Fruit]),
        ConfigModule.forRoot({
            load: [fruityviceConfig]
        }),
        HttpModule,
        LedgersModule,
        LocationsModule
    ],
    controllers: [FruitsController],
    providers: [
        FruitsService,
        FruityViceClient,
    ]
})
export class FruitsModule { }
