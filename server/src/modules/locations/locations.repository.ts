import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "./location.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocationsRepository {
    constructor(
        @InjectRepository(Location)
        private locationsRepository: Repository<Location>
    ) { }

    getById(locationId: number): Promise<Location> {
        return this.locationsRepository.findOneBy({ id: locationId});
    }
}