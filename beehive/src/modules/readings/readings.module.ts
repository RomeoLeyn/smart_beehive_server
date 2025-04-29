import { forwardRef, Module } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { ReadingsController } from './readings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Beehive } from '../beehives/entities/beehive.entity';
import { BeehiveModule } from '../beehives/beehive.module';
import { ParserService } from 'src/common/parser/parser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reading, Beehive]),
    forwardRef(() => BeehiveModule),
  ],
  controllers: [ReadingsController],
  providers: [ReadingsService, ParserService],
  exports: [ReadingsService],
})
export class ReadingsModule {}
