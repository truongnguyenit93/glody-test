import { EntityRepository, Repository } from 'typeorm';
import { Asset } from './../entitys/assets/asset.entity';

@EntityRepository(Asset)
export class AssetsRepository extends Repository<Asset> {
  async findByLocationId(locationId: number) {
    return this.find({ where: { location: { id: locationId } } });
  }
}
