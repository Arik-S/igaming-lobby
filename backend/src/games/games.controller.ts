import { Controller, Get, Post, Put, Delete, Body, Param, Headers, ForbiddenException } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly service: GamesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Headers('x-user-role') role: string, @Body() dto: CreateGameDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Headers('x-user-role') role: string, @Param('id') id: string, @Body() dto: UpdateGameDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Headers('x-user-role') role: string, @Param('id') id: string) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.remove(+id);
  }
}
