import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from '../locations/location.entity';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  serial: string;

  @Column()
  status: string;

  @Column()
  description: string;

  @Column({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Location, (location) => location.assets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'location_id' })
  location: Location;
}
