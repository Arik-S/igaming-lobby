import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobbySessionsController } from './lobby-sessions.controller';
import { LobbySessionsService } from './lobby-sessions.service';
import { LobbySession } from './lobby-session.entity';
import { Game } from '../games/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LobbySession, Game])],
  controllers: [LobbySessionsController],
  providers: [LobbySessionsService],
  exports: [LobbySessionsService],
})
export class LobbySessionsModule {}
