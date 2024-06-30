import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(Location)
        private locationsRepository: Repository<Location>
    ) { }

    getLocationById(locationId: number): Promise<Location> {
        return this.locationsRepository.findOneBy({ id: locationId});
    }
}
