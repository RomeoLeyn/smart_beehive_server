import { Module } from '@nestjs/common';
import { BeehiveService } from './beehive.service';
import { BeehiveController } from './beehive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beehive } from './entities/beehive.entity';
import { Apiary } from 'src/apiaries/entities/apiary.entity';
import { Reading } from 'src/readings/entities/reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beehive, Apiary, Reading])],
  controllers: [BeehiveController],
  providers: [BeehiveService],
  exports: [BeehiveService],
})
export class BeehiveModule {}
