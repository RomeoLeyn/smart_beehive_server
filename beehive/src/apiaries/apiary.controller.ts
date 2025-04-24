import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiaryService } from './apiary.service';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResoureceAccessGuard } from 'src/guard/resource-access-guard';
import { ApiariesResponseDto } from './dto/apiaries-response-dto';

@Controller('apiaries')
export class ApiaryController {
  constructor(private readonly apiaryService: ApiaryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createApiaryDto: CreateApiaryDto) {
    return this.apiaryService.create(Number(req.user.id), createApiaryDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req): Promise<ApiariesResponseDto[]> {
    return this.apiaryService.findAll(Number(req.user.user.id));
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, ResoureceAccessGuard)
  findOne(@Request() req, @Param('id') id: string) {
    return this.apiaryService.findOne(Number(req.user.id), +id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateApiaryDto: UpdateApiaryDto) {
    return this.apiaryService.update(+id, updateApiaryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.apiaryService.remove(+id);
  }
}
