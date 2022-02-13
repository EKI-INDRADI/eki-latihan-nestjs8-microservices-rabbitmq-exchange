import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqSubscriberUserService } from './rabbitmq-subscriber-user.service';

describe('RabbitmqSubscriberUserService', () => {
  let service: RabbitmqSubscriberUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitmqSubscriberUserService],
    }).compile();

    service = module.get<RabbitmqSubscriberUserService>(RabbitmqSubscriberUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
