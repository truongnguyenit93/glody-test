import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Location } from '../entitys/locations/location.entity';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class LocationsRepository extends Repository<Location> {
    constructor(@InjectDataSource() dataSource: DataSource) {
        super(Location, dataSource.createEntityManager());
    }
}
