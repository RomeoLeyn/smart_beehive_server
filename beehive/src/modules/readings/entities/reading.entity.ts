import { Beehive } from 'src/modules/beehives/entities/beehive.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('readings')
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Beehive, (beehive) => beehive.readings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'beehive_id' })
  beehive: Beehive;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  temperature: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  pressure: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  humidity: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  co2_level: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  weight: number;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  rain_percentage: number;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  longitude: string;

  @Column({ nullable: false, type: 'varchar', length: 255 })
  latitude: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
