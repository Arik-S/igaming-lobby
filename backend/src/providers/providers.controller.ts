import { Controller, Get, Post, Put, Delete, Body, Param, Headers, ForbiddenException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly service: ProvidersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Headers('x-user-role') role: string, @Body() dto: CreateProviderDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Headers('x-user-role') role: string, @Param('id') id: string, @Body() dto: UpdateProviderDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Headers('x-user-role') role: string, @Param('id') id: string) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.remove(+id);
  }
}
