import { Controller, Get, Post, Put, Delete, Body, Param, Headers, ForbiddenException } from '@nestjs/common';
import { LobbySessionsService } from './lobby-sessions.service';
import { CreateLobbySessionDto } from './dto/create-lobby-session.dto';
import { UpdateLobbySessionDto } from './dto/update-lobby-session.dto';
import { ReorderDto } from './dto/reorder.dto';

@Controller('lobby-sessions')
export class LobbySessionsController {
  constructor(private readonly service: LobbySessionsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Headers('x-user-role') role: string, @Body() dto: CreateLobbySessionDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.create(dto);
  }

  @Put('reorder')
  reorderSessions(@Headers('x-user-role') role: string, @Body() dto: ReorderDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.reorderSessions(dto);
  }

  @Put(':id')
  update(@Headers('x-user-role') role: string, @Param('id') id: string, @Body() dto: UpdateLobbySessionDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.update(+id, dto);
  }

  @Put(':id/reorder-games')
  reorderGames(@Headers('x-user-role') role: string, @Param('id') id: string, @Body() dto: ReorderDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.reorderGamesInSession(+id, dto);
  }

  @Post(':id/games/:gameId')
  addGame(@Headers('x-user-role') role: string, @Param('id') id: string, @Param('gameId') gameId: string) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.addGame(+id, +gameId);
  }

  @Delete(':id/games/:gameId')
  removeGame(@Headers('x-user-role') role: string, @Param('id') id: string, @Param('gameId') gameId: string) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.removeGame(+id, +gameId);
  }

  @Delete(':id')
  remove(@Headers('x-user-role') role: string, @Param('id') id: string) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.remove(+id);
  }
}
