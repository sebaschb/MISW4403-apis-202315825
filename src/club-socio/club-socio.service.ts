import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from 'src/club/entities/club.entity';
import { Socio } from 'src/socio/entities/socio.entity';

@Injectable()
export class ClubSocioService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
  ) {}

  async addMemberToClub(clubId: number, socioId: number): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }

    const socio = await this.socioRepository.findOne({
      where: { id: socioId },
    });
    if (!socio) {
      throw new NotFoundException(`Socio con ID ${socioId} no encontrado`);
    }

    club.socios.push(socio);
    return this.clubRepository.save(club);
  }

  async findMembersFromClub(clubId: number): Promise<Socio[]> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }
    return club.socios;
  }

  async findMemberFromClub(clubId: number, socioId: number): Promise<Socio> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }

    const socio = club.socios.find((s) => s.id === socioId);
    if (!socio) {
      throw new NotFoundException(
        `Socio con ID ${socioId} no encontrado en el club con ID ${clubId}`,
      );
    }
    return socio;
  }

  async updateMembersFromClub(
    clubId: number,
    socioIds: number[],
  ): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }

    const socios = await this.socioRepository.findByIds(socioIds);
    if (socios.length !== socioIds.length) {
      throw new NotFoundException('Algunos socios no fueron encontrados');
    }

    club.socios = socios;
    return this.clubRepository.save(club);
  }

  async deleteMemberFromClub(clubId: number, socioId: number): Promise<Club> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }

    club.socios = club.socios.filter((s) => s.id !== socioId);
    return this.clubRepository.save(club);
  }
}
