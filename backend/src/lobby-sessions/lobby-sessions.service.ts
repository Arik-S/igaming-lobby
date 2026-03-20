import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LobbySession } from './lobby-session.entity';
import { CreateLobbySessionDto } from './dto/create-lobby-session.dto';
import { UpdateLobbySessionDto } from './dto/update-lobby-session.dto';
import { ReorderDto } from './dto/reorder.dto';
import { Game } from '../games/game.entity';

@Injectable()
export class LobbySessionsService {
  constructor(
    @InjectRepository(LobbySession)
    private repo: Repository<LobbySession>,
    @InjectRepository(Game)
    private gameRepo: Repository<Game>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['games', 'games.provider', 'games.category'],
      order: { order: 'ASC' },
    });
  }

  async findOne(id: number) {
    const session = await this.repo.findOne({
      where: { id },
      relations: ['games', 'games.provider', 'games.category'],
    });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async create(dto: CreateLobbySessionDto) {
    const session = this.repo.create({ name: dto.name, order: dto.order ?? 0 });
    if (dto.gameIds?.length) {
      session.games = await this.gameRepo.findByIds(dto.gameIds);
    }
    return this.repo.save(session);
  }

  async update(id: number, dto: UpdateLobbySessionDto) {
    const session = await this.findOne(id);
    if (dto.name) session.name = dto.name;
    if (dto.order !== undefined) session.order = dto.order;
    if (dto.gameIds) {
      session.games = await this.gameRepo.findByIds(dto.gameIds);
    }
    return this.repo.save(session);
  }

  async remove(id: number) {
    const session = await this.findOne(id);
    return this.repo.remove(session);
  }

  async reorderSessions(dto: ReorderDto) {
    const updates = dto.ids.map((id, index) =>
      this.repo.update(id, { order: index }),
    );
    await Promise.all(updates);
    return this.findAll();
  }

  async reorderGamesInSession(sessionId: number, dto: ReorderDto) {
    const session = await this.findOne(sessionId);
    const gamesMap = new Map(session.games.map((g) => [g.id, g]));
    session.games = dto.ids.map((id) => gamesMap.get(id)).filter(Boolean) as Game[];
    return this.repo.save(session);
  }

  async addGame(sessionId: number, gameId: number) {
    const session = await this.findOne(sessionId);
    const game = await this.gameRepo.findOne({ where: { id: gameId } });
    if (!game) throw new NotFoundException('Game not found');
    session.games = [...session.games, game];
    return this.repo.save(session);
  }

  async removeGame(sessionId: number, gameId: number) {
    const session = await this.findOne(sessionId);
    session.games = session.games.filter((g) => g.id !== gameId);
    return this.repo.save(session);
  }
}
