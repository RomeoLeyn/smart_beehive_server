import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/tyes/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, password: string) {
    const user: User | null = await this.userService.findOne(phoneNumber);

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      return user;
    }
    return null;
  }

  async login(user: IUser) {
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
