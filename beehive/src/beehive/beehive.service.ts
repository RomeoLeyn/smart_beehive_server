import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeehiveDto } from './dto/create-beehive.dto';
import { UpdateBeehiveDto } from './dto/update-beehive.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Beehive } from './entities/beehive.entity';
import { Repository } from 'typeorm';
import { Apiary } from 'src/apiaries/entities/apiary.entity';
import { Reading } from 'src/readings/entities/reading.entity';
import { NUMBER_OF_RECORDS } from 'src/constants/constants';

@Injectable()
export class BeehiveService {
  constructor(
    @InjectRepository(Beehive)
    private readonly beehiveRepositroy: Repository<Beehive>,
    @InjectRepository(Apiary)
    private readonly apiaryRepository: Repository<Apiary>,
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
  ) {}

  async create(createBeehiveDto: CreateBeehiveDto) {
    const apiary = await this.apiaryRepository.findOne({
      where: { id: createBeehiveDto.apiaryId },
    });

    if (!apiary) {
      throw new Error('Apiary not found');
    }

    const beehive = await this.beehiveRepositroy.save({
      beehive_key: createBeehiveDto.beehive_key,
      apiary: { id: apiary.id },
      name: createBeehiveDto.name,
    });

    return { beehive };
  }

  async findOne(id: number) {
    const beehive = await this.beehiveRepositroy.findOne({
      where: { id },
    });

    const readingsInSevenDays = await this.readingRepository.find({
      where: { beehive: { id: beehive?.id } },
      order: { id: 'DESC' },
      take: NUMBER_OF_RECORDS,
    });
    return {
      id: beehive?.id,
      name: beehive?.name,
      beehive_key: beehive?.beehive_key,
      readings: readingsInSevenDays,
      createdAt: beehive?.createdAt,
      updatedAt: beehive?.updatedAt,
    };
  }

  async update(id: number, updateBeehiveDto: UpdateBeehiveDto) {
    const isBeehiveExists = await this.beehiveRepositroy.findOne({
      where: { id },
    });

    if (!isBeehiveExists) {
      throw new NotFoundException('Beehive not found');
    }

    return this.beehiveRepositroy.update(id, updateBeehiveDto);
  }

  remove(id: number) {
    return `This action removes a #${id} beehive`;
  }
}
