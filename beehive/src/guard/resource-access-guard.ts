import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiaryService } from 'src/apiaries/apiary.service';

@Injectable()
export class ResoureceAccessGuard implements CanActivate {
  constructor(private readonly apiaryService: ApiaryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type } = request.params as { id: number; type: string };
    const user = request.user;

    let entity;

    switch (type) {
      case 'apiaries':
        entity = await this.apiaryService.findById(+id);
        break;
      case 'apiary':
        entity = await this.apiaryService.findById(+id);
        break;
      default:
        throw new NotFoundException('Not found');
    }

    if (entity && user && entity.apiaryDetails.user.id === user.id) {
      return true;
    }

    return false;
  }
}
