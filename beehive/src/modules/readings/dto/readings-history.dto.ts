import { ReadingsResponseDto } from './readings-response-dto';

export class ReadingsHistoryDto {
  beehive: {
    id: number;
    name: string;
  };
  readings: ReadingsResponseDto[];
}
