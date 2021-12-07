import { Test, TestingModule } from '@nestjs/testing';
import { TrigsController } from './trigs.controller';
import { TrigsService } from './trigs.service';

describe('TrigsController', () => {
  let controller: TrigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrigsController],
      providers: [TrigsService],
    }).compile();

    controller = module.get<TrigsController>(TrigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
