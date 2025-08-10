import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationsRepository } from './../repositorys/locations.repository';
import { Location } from '../entitys/locations/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationsRepository)
    private readonly locationsRepo: LocationsRepository,
  ) {}

  async findById(id: number): Promise<Location | undefined> {
    return this.locationsRepo.findOneById(id);
  }
}
