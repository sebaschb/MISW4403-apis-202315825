import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async findOne(id: number): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id: id },
    });
    if (!club) {
      throw new NotFoundException(`Club con ID ${id} no encontrado`);
    }
    return club;
  }

  create(createClubDto: CreateClubDto): Promise<Club> {
    const club = this.clubRepository.create(createClubDto);
    return this.clubRepository.save(club);
  }

  async update(id: number, updateClubDto: UpdateClubDto): Promise<Club> {
    const club = await this.findOne(id);
    Object.assign(club, updateClubDto);
    return this.clubRepository.save(club);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clubRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Club con ID ${id} no encontrado`);
    }
  }
}
