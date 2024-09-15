import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubSocioService } from './club-socio.service';
import { ClubSocioController } from './club-socio.controller';
import { Club } from 'src/club/entities/club.entity';
import { Socio } from 'src/socio/entities/socio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Socio])],
  controllers: [ClubSocioController],
  providers: [ClubSocioService],
  exports: [ClubSocioService],
})
export class ClubSocioModule {}
