import { Test, TestingModule } from '@nestjs/testing';
import { SpeechtotextService } from './speechtotext.service';

describe('SpeechtotextService', () => {
  let service: SpeechtotextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpeechtotextService],
    }).compile();

    service = module.get<SpeechtotextService>(SpeechtotextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
