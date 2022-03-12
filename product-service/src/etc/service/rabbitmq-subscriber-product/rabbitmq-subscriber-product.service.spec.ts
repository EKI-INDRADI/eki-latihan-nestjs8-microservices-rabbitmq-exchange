import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqSubscriberProductService } from './rabbitmq-subscriber-product.service';

describe('RabbitmqSubscriberProductService', () => {
  let service: RabbitmqSubscriberProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitmqSubscriberProductService],
    }).compile();

    service = module.get<RabbitmqSubscriberProductService>(RabbitmqSubscriberProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
