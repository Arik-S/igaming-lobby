import { Test, TestingModule } from '@nestjs/testing';
import { LobbySessionsController } from './lobby-sessions.controller';

describe('LobbySessionsController', () => {
  let controller: LobbySessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LobbySessionsController],
    }).compile();

    controller = module.get<LobbySessionsController>(LobbySessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
