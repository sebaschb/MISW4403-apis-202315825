import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSocioDto } from './dto/create-socio.dto';
import { UpdateSocioDto } from './dto/update-socio.dto';
import { Socio } from './entities/socio.entity';

@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
  ) {}

  findAll(): Promise<Socio[]> {
    return this.socioRepository.find();
  }

  async findOne(id: number): Promise<Socio> {
    const socio = await this.socioRepository.findOne({
      where: { id: id },
    });
    if (!socio) {
      throw new NotFoundException(`Socio con ID ${id} no encontrado`);
    }
    return socio;
  }

  create(createSocioDto: CreateSocioDto): Promise<Socio> {
    const socio = this.socioRepository.create(createSocioDto);
    return this.socioRepository.save(socio);
  }

  async update(id: number, updateSocioDto: UpdateSocioDto): Promise<Socio> {
    const socio = await this.findOne(id);
    Object.assign(socio, updateSocioDto);
    return this.socioRepository.save(socio);
  }

  async remove(id: number): Promise<void> {
    const result = await this.socioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Socio con ID ${id} no encontrado`);
    }
  }
}
