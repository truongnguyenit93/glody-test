import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../entitys/locations/location.entity';

@EntityRepository(Location)
export class LocationsRepository extends Repository<Location> {}
