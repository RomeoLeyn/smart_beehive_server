import { MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(10, { message: 'Phone number must be more then 10 symbols' })
  phoneNumber: string;

  @MinLength(6, { message: 'Password must be more then 6 symbols' })
  password: string;
}
