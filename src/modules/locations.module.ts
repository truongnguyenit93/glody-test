import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsService } from '../services/locations.service';
import { LocationsRepository } from '../repositorys/locations.repository';
import { Location } from '../entitys/locations/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
  ],
  providers: [
    LocationsService,
    LocationsRepository,
  ],
  exports: [
    LocationsService,
    LocationsRepository,
  ],
})
export class LocationsModule {}