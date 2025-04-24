import { Test, TestingModule } from '@nestjs/testing';
import { ApiaryController } from './apiary.controller';
import { ApiaryService } from './apiary.service';

describe('ApiaryController', () => {
  let controller: ApiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiaryController],
      providers: [ApiaryService],
    }).compile();

    controller = module.get<ApiaryController>(ApiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
