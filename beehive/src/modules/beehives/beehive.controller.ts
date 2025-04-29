import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BeehiveService } from './beehive.service';
import { CreateBeehiveDto } from './dto/create-beehive.dto';
import { UpdateBeehiveDto } from './dto/update-beehive.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('beehives')
export class BeehiveController {
  constructor(private readonly beehiveService: BeehiveService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBeehiveDto: CreateBeehiveDto) {
    return this.beehiveService.create(createBeehiveDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    return this.beehiveService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBeehiveDto: UpdateBeehiveDto) {
    return this.beehiveService.update(+id, updateBeehiveDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.beehiveService.remove(+id);
  }
}
