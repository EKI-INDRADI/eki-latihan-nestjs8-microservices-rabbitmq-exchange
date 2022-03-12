import { Test, TestingModule } from '@nestjs/testing';
import { PagePostgresqlService } from './page-postgresql.service';

describe('PagePostgresqlService', () => {
  let service: PagePostgresqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagePostgresqlService],
    }).compile();

    service = module.get<PagePostgresqlService>(PagePostgresqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
