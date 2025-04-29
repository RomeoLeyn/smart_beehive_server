import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/user.module';
import { ApiaryController } from './apiary.controller';
import { ApiaryService } from './apiary.service';
import { Apiary } from './entities/apiary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apiary]), UserModule],
  controllers: [ApiaryController],
  providers: [ApiaryService],
  exports: [ApiaryService, TypeOrmModule],
})
export class ApiaryModule {}
