import { Controller, Get, Post, Put, Delete, Body, Param, Headers, ForbiddenException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Headers('x-user-role') role: string, @Body() dto: CreateCategoryDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Headers('x-user-role') role: string, @Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Headers('x-user-role') role: string, @Param('id') id: string) {
    if (role !== 'admin') throw new ForbiddenException();
    return this.service.remove(+id);
  }
}
