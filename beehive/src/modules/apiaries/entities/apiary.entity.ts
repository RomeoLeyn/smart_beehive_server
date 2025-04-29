import { Beehive } from 'src/modules/beehives/entities/beehive.entity';
import { User } from 'src/modules/users/entities/user.entity';
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

@Entity('apiaries')
export class Apiary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.apiaries, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Beehive, (beehive) => beehive.apiary, { cascade: true })
  beehives: Beehive[];

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  region: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  city: string;

  @Column({ name: 'bee_breeds', type: 'text', array: true, nullable: false })
  beeBreeds: string[];

  @Column({ name: 'honey_type', type: 'text', array: true, nullable: false })
  honeyType: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
