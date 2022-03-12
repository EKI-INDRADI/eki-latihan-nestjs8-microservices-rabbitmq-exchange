import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqPublisherService } from './rabbitmq-publisher.service';

describe('RabbitmqPublisherService', () => {
  let service: RabbitmqPublisherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitmqPublisherService],
    }).compile();

    service = module.get<RabbitmqPublisherService>(RabbitmqPublisherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
