import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiaryModule } from '../apiaries/apiary.module';
import { ReadingsModule } from '../readings/readings.module';
import { BeehiveController } from './beehive.controller';
import { BeehiveService } from './beehive.service';
import { Beehive } from './entities/beehive.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Beehive]),
    forwardRef(() => ReadingsModule),
    ApiaryModule,
  ],
  controllers: [BeehiveController],
  providers: [BeehiveService],
  exports: [BeehiveService],
})
export class BeehiveModule {}
