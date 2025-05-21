import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { IUser } from '../types/types';

@Injectable()
export class ParserUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): IUser {
    if (
      !value ||
      typeof value !== 'object' ||
      !value.id ||
      !value.phoneNumber
    ) {
      throw new BadRequestException('Invalid user object');
    }

    const user: IUser = {
      id: value.id,
      phoneNumber: value.phoneNumber,
    };

    return user;
  }
}
