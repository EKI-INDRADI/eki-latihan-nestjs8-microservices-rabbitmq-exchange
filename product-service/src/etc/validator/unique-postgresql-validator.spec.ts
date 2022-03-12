import { Test, TestingModule } from '@nestjs/testing';
import { UniquePostgresqlValidator } from './unique-postgresql-validator';

describe('UniquePostgresqlValidator', () => {
  let provider: UniquePostgresqlValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniquePostgresqlValidator],
    }).compile();

    provider = module.get<UniquePostgresqlValidator>(UniquePostgresqlValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
