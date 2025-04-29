import { PartialType } from '@nestjs/mapped-types';
import { CreateBeehiveDto } from './create-beehive.dto';

export class UpdateBeehiveDto extends PartialType(CreateBeehiveDto) {}
