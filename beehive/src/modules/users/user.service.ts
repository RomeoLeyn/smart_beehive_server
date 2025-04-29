import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/common/constants/constants';
import { AuthResponseUserDto } from './dto/auth-user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<AuthResponseUserDto> {
    const existingUser = await this.findOne(createUserDto.phoneNumber);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = await this.userRepository.save({
      phoneNumber: createUserDto.phoneNumber,
      password: bcrypt.hashSync(createUserDto.password, SALT_ROUNDS),
    });

    const token = this.jwtService.sign({
      id: user.id,
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

  async findOne(phoneNumber: string) {
    return await this.userRepository.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findById(id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.update(id, updateUserDto);
  }
}
