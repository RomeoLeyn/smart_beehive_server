import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiaryService } from '../apiaries/apiary.service';
import { ReadingsService } from '../readings/readings.service';
import { CreateBeehiveDto } from './dto/create-beehive.dto';
import { UpdateBeehiveDto } from './dto/update-beehive.dto';
import { Beehive } from './entities/beehive.entity';

@Injectable()
export class BeehiveService {
  constructor(
    @InjectRepository(Beehive)
    private readonly beehiveRepositroy: Repository<Beehive>,
    private readonly apiaryService: ApiaryService,
    @Inject(forwardRef(() => ReadingsService))
    private readonly readingService: ReadingsService,
  ) {}

  async findById(id: number) {
    const beehive = await this.beehiveRepositroy.findOne({
      where: { id },
    });

    if (!beehive) {
      throw new NotFoundException('Beehive not found');
    }

    return beehive;
  }

  async findByKey(beehiveKey: string) {
    const beehive = await this.beehiveRepositroy.findOneBy({
      beehive_key: beehiveKey,
    });

    if (!beehive) {
      throw new NotFoundException('Beehive not found');
    }

    return beehive;
  }

  async create(createBeehiveDto: CreateBeehiveDto) {
    const apiary = await this.apiaryService.findById(createBeehiveDto.apiaryId);
    const beehive = await this.beehiveRepositroy.save({
      beehive_key: createBeehiveDto.beehive_key,
      apiary: { id: apiary.id },
      name: createBeehiveDto.name,
    });

    return beehive;
  }

  async findOne(id: number) {
    const beehive = await this.findById(id);
    const readingsInSevenDays =
      await this.readingService.findReadingsInSevenDays(id);
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
    const isBeehiveExists = await this.findById(id);

    if (!isBeehiveExists) {
      throw new NotFoundException('Beehive not found');
    }

    return this.beehiveRepositroy.update(id, updateBeehiveDto);
  }

  remove(id: number) {
    return `This action removes a #${id} beehive`;
  }
}
