import { Test, TestingModule } from '@nestjs/testing';
import { LobbySessionsService } from './lobby-sessions.service';

describe('LobbySessionsService', () => {
  let service: LobbySessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbySessionsService],
    }).compile();

    service = module.get<LobbySessionsService>(LobbySessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
