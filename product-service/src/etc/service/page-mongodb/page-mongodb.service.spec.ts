import { Test, TestingModule } from '@nestjs/testing';
import { PageMongodbService } from './page-mongodb.service';

describe('PageMongodbService', () => {
  let service: PageMongodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageMongodbService],
    }).compile();

    service = module.get<PageMongodbService>(PageMongodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
