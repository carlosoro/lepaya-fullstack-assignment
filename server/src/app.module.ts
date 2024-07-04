import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitsModule } from './modules/fruits/fruits.module';
import { LocationsModule } from './modules/locations/locations.module';
import { LedgersModule } from './modules/ledgers/ledgers.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('databaseConfig'))
    }),
    LedgersModule,
    FruitsModule,
    LocationsModule
  ],
})
export class AppModule { }
