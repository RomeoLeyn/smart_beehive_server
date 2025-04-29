import { ReadingResponseDto } from 'src/modules/readings/dto/reading-response-dto';

export class BeehivesResponseDto {
  id?: number;
  name?: string;
  beehive_key?: string;
  readings?: ReadingResponseDto;
  createdAt?: string;
  updatedAt?: string;
}
