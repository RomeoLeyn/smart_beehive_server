export class ReadingsResponseDto {
  id: number;
  temperature: number;
  pressure: number;
  humidity: number;
  co2_level: number;
  weight: number;
  distance: number;
  rain_precentage: number;
  longitude: string;
  latitude: string;
  createdAt: Date;
  updatedAt: Date;
}
