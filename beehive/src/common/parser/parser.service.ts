import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReadingDto } from 'src/modules/readings/dto/create-reading.dto';

@Injectable()
export class ParserService {
  parseReading(message: string): CreateReadingDto {
    try {
      return JSON.parse(message) as CreateReadingDto;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid reading data');
    }
  }
}
