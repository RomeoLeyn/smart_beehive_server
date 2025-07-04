import { UserResponseDto } from 'src/modules/users/dto/user-response-dto';

export class ApiariesResponseDto {
  name: string;
  region: string;
  city: string;
  user: UserResponseDto;
  beehiveCount: number;
  beeBreeds: string[];
  honeyType: string[];

  constructor(partial: Partial<ApiariesResponseDto>) {
    Object.assign(this, partial);
  }
}
