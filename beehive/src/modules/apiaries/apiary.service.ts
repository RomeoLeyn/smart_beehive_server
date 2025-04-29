import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { ApiariesResponseDto } from './dto/apiaries-response-dto';
import { ApiaryDetailsResponseDto } from './dto/apiary-details-response-dto';
import { CreateApiaryDto } from './dto/create-apiary.dto';
import { UpdateApiaryDto } from './dto/update-apiary.dto';
import { Apiary } from './entities/apiary.entity';

@Injectable()
export class ApiaryService {
  constructor(
    @InjectRepository(Apiary)
    private readonly apiaryRepository: Repository<Apiary>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, createApiaryDto: CreateApiaryDto) {
    const user = await this.userService.findById(userId);
    const apiary = await this.apiaryRepository.save({
      user: { id: user.id },
      name: createApiaryDto.name,
      region: createApiaryDto.region,
      city: createApiaryDto.city,
      beeBreeds: createApiaryDto.beeBreeds,
      honeyType: createApiaryDto.honeyType,
    });
    return apiary;
  }

  async findAll(userId: number): Promise<ApiariesResponseDto[]> {
    const apiaries = await this.apiaryRepository.find({
      where: { user: { id: userId } },
      relations: {
        user: true,
        beehives: true,
      },
    });
    return apiaries.map((apiary) => ({
      id: apiary.id,
      name: apiary.name,
      region: apiary.region,
      city: apiary.city,
      user: {
        id: apiary.user.id,
        phoneNumber: apiary.user.phoneNumber,
      },
      beehiveCount: apiary.beehives.length,
      beeBreeds: apiary.beeBreeds,
      honeyType: apiary.honeyType,
    }));
  }

  async findOne(id: number): Promise<ApiaryDetailsResponseDto> {
    const apiaryDetails = await this.apiaryRepository.findOne({
      where: { id },
      relations: {
        beehives: {
          readings: true,
        },
        user: true,
      },
    });

    if (!apiaryDetails) {
      throw new Error('Apiary not found');
    }

    return {
      id: apiaryDetails?.id,
      name: apiaryDetails?.name,
      region: apiaryDetails?.region,
      city: apiaryDetails?.city,
      beeBreeds: apiaryDetails?.beeBreeds,
      honeyType: apiaryDetails?.honeyType,
      user: {
        id: apiaryDetails?.user.id,
        phoneNumber: apiaryDetails?.user.phoneNumber,
      },
      beehives: apiaryDetails?.beehives?.map((beehive) => ({
        id: beehive.id,
        name: beehive.name,
        readings: beehive.readings,
        beehive_key: beehive.beehive_key,
      })),
      createdAt: apiaryDetails?.createdAt.toISOString(),
      updatedAt: apiaryDetails?.updatedAt.toISOString(),
    };
  }

  async findById(id: number) {
    const apiaryDetails = await this.apiaryRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!apiaryDetails) {
      throw new NotFoundException('Apidary not found');
    }

    return apiaryDetails;
  }

  async update(id: number, updateApiaryDto: UpdateApiaryDto) {
    const isApiaryExists = await this.findById(id);
    if (!isApiaryExists) {
      throw new NotFoundException('Apiary not found');
    }

    return this.apiaryRepository.update(id, updateApiaryDto);
  }

  remove(id: number) {
    return `This action removes a #${id} apiary`;
  }
}
