import { Test, TestingModule } from '@nestjs/testing';
import { ExistPostgresqlValidator } from './exist-postgresql-validator';

describe('ExistPostgresqlValidator', () => {
  let provider: ExistPostgresqlValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExistPostgresqlValidator],
    }).compile();

    provider = module.get<ExistPostgresqlValidator>(ExistPostgresqlValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
