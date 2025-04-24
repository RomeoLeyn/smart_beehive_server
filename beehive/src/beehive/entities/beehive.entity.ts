import { Apiary } from 'src/apiaries/entities/apiary.entity';
import { Reading } from 'src/readings/entities/reading.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('beehives')
export class Beehive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  beehive_key: string;

  @ManyToOne(() => Apiary, (apiary) => apiary.beehives, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'apiary_id' })
  apiary: Apiary;

  @OneToMany(() => Reading, (reading) => reading.beehive, {
    onDelete: 'CASCADE',
  })
  readings: Reading;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
