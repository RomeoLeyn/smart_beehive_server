import { ReadingsResponseDto } from 'src/readings/dto/readings-response-dto';

export class BeehiveDetailsResponseDto {
  id: number;
  beehive_key: number;
  name: string;
  readings: ReadingsResponseDto[];
  createdAt: string;
  updatedAt: string;
}
