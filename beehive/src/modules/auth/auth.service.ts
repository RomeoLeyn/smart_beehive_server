import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/common/types/types';
import { AuthResponseUserDto } from 'src/modules/users/dto/auth-user-response.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UserService } from 'src/modules/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, password: string) {
    const user: User | null =
      await this.userService.findByPhoneNumber(phoneNumber);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      return user;
    }
    return null;
  }

  async create(user: CreateUserDto): Promise<AuthResponseUserDto> {
    const existingUser = await this.userService.findByPhoneNumber(
      user.phoneNumber,
    );

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return await this.userService.create(user);
  }

  async login(user: IUser): Promise<AuthResponseUserDto> {
    const { id, phoneNumber } = user;
    return {
      user: {
        id,
        phoneNumber,
      },
      token: this.jwtService.sign({
        id: user.id,
        phoneNumber: user.phoneNumber,
      }),
    };
  }
}
