import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReadingDto } from './dto/create-reading.dto';
import { Repository } from 'typeorm';
import { Reading } from './entities/reading.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Beehive } from 'src/beehive/entities/beehive.entity';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
    @InjectRepository(Beehive)
    private readonly beehiveRepositroy: Repository<Beehive>,
  ) {}

  async create(rawReading: string): Promise<void> {
    const readings: CreateReadingDto = JSON.parse(
      rawReading,
    ) as CreateReadingDto;

    const beehive = await this.beehiveRepositroy.findOneBy({
      beehive_key: readings.beehive_key,
    });

    if (!beehive) {
      throw new NotFoundException('Beehive not found');
    }

    await this.readingRepository.save({
      beehive_id: beehive.id,
      temperature: readings.temperature,
      pressure: readings.pressure,
      humidity: readings.humidity,
      co2_level: readings.co2_level,
      weight: readings.weight,
      distance: readings.distance,
      rain_percentage: readings.rain_percentage,
      longitude: readings.longitude,
      latitude: readings.latitude,
    });
  }

  findAll() {
    return `This action returns all readings`;
  }
}
