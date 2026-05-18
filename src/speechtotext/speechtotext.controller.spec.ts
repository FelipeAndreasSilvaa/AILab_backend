import { Test, TestingModule } from '@nestjs/testing';
import { SpeechtotextController } from './speechtotext.controller';
import { SpeechtotextService } from './speechtotext.service';

describe('SpeechtotextController', () => {
  let controller: SpeechtotextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeechtotextController],
      providers: [SpeechtotextService],
    }).compile();

    controller = module.get<SpeechtotextController>(SpeechtotextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
