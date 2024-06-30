import { Injectable } from '@nestjs/common';
import { Location } from './location.entity';
import { LocationsRepository } from './locations.repository';

@Injectable()
export class LocationsService {
    constructor(
        private readonly locationsRepository: LocationsRepository
    ) { }

    getLocationById(locationId: number): Promise<Location> {
        return this.locationsRepository.getById(locationId);
    }
}
