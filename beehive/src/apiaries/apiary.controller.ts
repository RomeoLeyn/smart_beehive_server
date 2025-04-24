import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ResoureceAccessGuard } from 'src/guard/resource-access-guard';
import { ApiaryService } from './apiary.service';
import { ApiariesResponseDto } from './dto/apiaries-response-dto';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';

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
    console.log(req.user.id);
    return this.apiaryService.findAll(Number(req.user.id));
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, ResoureceAccessGuard)
  findOne(@Param('id') id: string) {
    return this.apiaryService.findOne(+id);
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
