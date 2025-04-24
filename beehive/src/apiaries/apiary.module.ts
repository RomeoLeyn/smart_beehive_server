import { Module } from '@nestjs/common';
import { ApiaryService } from './apiary.service';
import { ApiaryController } from './apiary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apiary } from './entities/apiary.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apiary, User])],
  controllers: [ApiaryController],
  providers: [ApiaryService],
  exports: [ApiaryService],
})
export class ApiaryModule {}
