import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private repo: Repository<Provider>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const provider = await this.repo.findOne({ where: { id } });
    if (!provider) throw new NotFoundException('Provider not found');
    return provider;
  }

  create(dto: CreateProviderDto) {
    const provider = this.repo.create(dto);
    return this.repo.save(provider);
  }

  async update(id: number, dto: UpdateProviderDto) {
    const provider = await this.findOne(id);
    Object.assign(provider, dto);
    return this.repo.save(provider);
  }

  async remove(id: number) {
    const provider = await this.findOne(id);
    return this.repo.remove(provider);
  }
}
