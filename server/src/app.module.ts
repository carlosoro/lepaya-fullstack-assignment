import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitsModule } from './fruits/fruits.module';
import { LocationsModule } from './locations/locations.module';
import { LedgersModule } from './ledgers/ledgers.module';
import database from './config/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('database'))
    }),
    LedgersModule,
    FruitsModule,
    LocationsModule
  ],
})
export class AppModule { }
