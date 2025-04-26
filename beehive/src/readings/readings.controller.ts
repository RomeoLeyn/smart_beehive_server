import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ReadingsService } from './readings.service';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findAllReadingsByBeehiveId(@Param('id') id: number) {
    return this.readingsService.findAll(id);
  }
}
