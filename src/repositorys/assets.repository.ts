import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Asset } from './../entitys/assets/asset.entity';

@Injectable()
export class AssetsRepository extends Repository<Asset> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Asset, dataSource.createEntityManager());
  }

  async findByLocationId(locationId: number) {
    return this.find({ where: { location: { id: locationId } } });
  }
}