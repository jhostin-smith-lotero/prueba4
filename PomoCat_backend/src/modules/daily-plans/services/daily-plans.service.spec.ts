import { Test, TestingModule } from '@nestjs/testing';
import { DailyPlansService } from './daily-plans.service';

describe('DailyPlansService', () => {
  let service: DailyPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyPlansService],
    }).compile();

    service = module.get<DailyPlansService>(DailyPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
