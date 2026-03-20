import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private repo: Repository<Game>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['provider', 'category'] });
  }

  async findOne(id: number) {
    const game = await this.repo.findOne({ where: { id }, relations: ['provider', 'category'] });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async create(dto: CreateGameDto) {
    const game = this.repo.create({
      name: dto.name,
      thumbnail: dto.thumbnail,
      provider: { id: dto.providerId },
      category: { id: dto.categoryId },
    });
    return this.repo.save(game);
  }

  async update(id: number, dto: UpdateGameDto) {
    const game = await this.findOne(id);
    if (dto.name) game.name = dto.name;
    if (dto.thumbnail) game.thumbnail = dto.thumbnail;
    if (dto.providerId) game.provider = { id: dto.providerId } as any;
    if (dto.categoryId) game.category = { id: dto.categoryId } as any;
    return this.repo.save(game);
  }

  async remove(id: number) {
    const game = await this.findOne(id);
    return this.repo.remove(game);
  }
}
