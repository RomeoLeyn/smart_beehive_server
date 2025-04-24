import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/constants/constants';
import { CreateResponseUserDto } from './dto/create-user-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateResponseUserDto> {
    const existingUser = await this.userRepository.findOne({
      where: {
        phoneNumber: createUserDto.phoneNumber,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await this.userRepository.save({
      phoneNumber: createUserDto.phoneNumber,
      password: bcrypt.hashSync(createUserDto.password, SALT_ROUNDS),
    });

    const token = this.jwtService.sign({
      phoneNumber: createUserDto.phoneNumber,
    });

    return {
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
      },
      token: token,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(phoneNumber: string) {
    return await this.userRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
