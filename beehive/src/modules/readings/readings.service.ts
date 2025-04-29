import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParserService } from 'src/common/parser/parser.service';
import { Repository } from 'typeorm';
import { BeehiveService } from '../beehives/beehive.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { ReadingsHistoryDto } from './dto/readings-history.dto';
import { Reading } from './entities/reading.entity';
import { NUMBER_OF_RECORDS } from 'src/common/constants/constants';

@Injectable()
export class ReadingsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
    @Inject(forwardRef(() => BeehiveService))
    private readonly beehiveService: BeehiveService,
    private readonly parserService: ParserService,
  ) {}

  private async saveReadings(
    readings: CreateReadingDto,
    beehiveId: number,
  ): Promise<void> {
    await this.readingRepository.save({
      beehive: { id: beehiveId },
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

  private async findBeehiveReadingsHostiry(id: number) {
    return await this.readingRepository.find({
      where: { beehive: { id: id } },
    });
  }

  async findReadingsInSevenDays(beehiveId: number) {
    return await this.readingRepository.find({
      where: { beehive: { id: beehiveId } },
      order: { id: 'DESC' },
      take: NUMBER_OF_RECORDS,
    });
  }

  async create(rawReading: string): Promise<void> {
    const readings: CreateReadingDto =
      this.parserService.parseReading(rawReading);
    const beehive = await this.beehiveService.findByKey(readings.beehive_key);
    await this.saveReadings(readings, beehive.id);
  }

  async findAll(id: number): Promise<ReadingsHistoryDto> {
    const beehive = await this.beehiveService.findById(id);
    const readingsHistory = await this.findBeehiveReadingsHostiry(beehive.id);

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
