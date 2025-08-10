import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Organization } from '../organizations/organization.entity';
import { Device } from '../devices/device.entity';
import { Asset } from '../assets/asset.entity';

@Entity({ name: 'locations' })
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location_id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Organization, organization => organization.locations)
  organization: Organization;

  @OneToMany(() => Device, device => device.location)
  devices: Device[];

  @OneToMany(() => Asset, asset => asset.location)
  assets: Asset[];
}
