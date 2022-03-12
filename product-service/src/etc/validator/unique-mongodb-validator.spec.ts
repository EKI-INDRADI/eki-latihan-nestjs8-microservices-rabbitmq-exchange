import { Test, TestingModule } from '@nestjs/testing';
import { UniqueMongodbValidator } from './unique-mongodb-validator';

describe('UniqueMongodbValidator', () => {
  let provider: UniqueMongodbValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniqueMongodbValidator],
    }).compile();

    provider = module.get<UniqueMongodbValidator>(UniqueMongodbValidator);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
