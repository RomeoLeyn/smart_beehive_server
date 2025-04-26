import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Beehive } from 'src/beehive/entities/beehive.entity';
import { Repository } from 'typeorm';
import { CreateReadingDto } from './dto/create-reading.dto';
import { Reading } from './entities/reading.entity';
import { ReadingsHistoryDto } from './dto/readings-history.dto';

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
      beehive: { id: beehive.id },
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

  async findAll(id: number): Promise<ReadingsHistoryDto> {
    const beehive = await this.beehiveRepositroy.findOne({ where: { id: id } });

    if (!beehive) {
      throw new NotFoundException('Beehive not found');
    }

    const readingsHistory = await this.readingRepository.find({
      where: { beehive: { id: beehive.id } },
    });

    console.log(typeof beehive);
    console.log(typeof readingsHistory);

    return {
      beehive: {
        id: beehive.id,
        name: beehive.name,
      },
      readings: readingsHistory.map((readings) => ({
        id: readings.id,
        temperature: readings.temperature,
        pressure: readings.pressure,
        humidity: readings.humidity,
        co2_level: readings.co2_level,
        weight: readings.weight,
        distance: readings.weight,
        rain_precentage: readings.rain_percentage,
        longitude: readings.longitude,
        latitude: readings.latitude,
        createdAt: readings.createdAt,
        updatedAt: readings.updatedAt,
      })),
    };
  }
}
