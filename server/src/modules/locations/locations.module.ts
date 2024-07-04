import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './location.entity';
import { LocationsRepository } from './locations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
  ],
  providers: [LocationsService, LocationsRepository],
  exports: [LocationsService]
})
export class LocationsModule {}
