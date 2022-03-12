import { Test, TestingModule } from '@nestjs/testing';
import { ExistMongodbValidator } from './exist-mongodb-validator';

describe('ExistMongodbValidator', () => {
  let provider: ExistMongodbValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExistMongodbValidator],
    }).compile();

    provider = module.get<ExistMongodbValidator>(ExistMongodbValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
