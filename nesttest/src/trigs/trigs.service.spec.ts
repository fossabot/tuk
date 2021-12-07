import { Test, TestingModule } from '@nestjs/testing';
import { TrigsService } from './trigs.service';

describe('TrigsService', () => {
  let service: TrigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrigsService],
    }).compile();

    service = module.get<TrigsService>(TrigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
