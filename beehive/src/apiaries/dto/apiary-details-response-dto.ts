import { BeehivesResponseDto } from 'src/beehive/dto/beehives-response-dto';
import { UserResponseDto } from 'src/user/dto/user-response-dto';

export class ApiaryDetailsResponseDto {
  id?: number;
  name?: string;
  beehives?: BeehivesResponseDto[];
  region?: string;
  city?: string;
  user?: UserResponseDto;
  beeBreeds?: string[];
  honeyType?: string[];
  createdAt?: string;
  updatedAt?: string;
}
