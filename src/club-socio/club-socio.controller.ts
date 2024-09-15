import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ClubSocioService } from './club-socio.service';
import { CreateClubSocioDto } from './dto/create-club-socio.dto';

@Controller('clubs')
export class ClubSocioController {
  constructor(private readonly clubSocioService: ClubSocioService) {}

  @Post(':clubId/members')
  addMemberToClub(
    @Param('clubId') clubId: string,
    @Body() addMemberDto: CreateClubSocioDto,
  ) {
    return this.clubSocioService.addMemberToClub(+clubId, addMemberDto.socioId);
  }

  @Get(':clubId/members')
  findMembersFromClub(@Param('clubId') clubId: string) {
    return this.clubSocioService.findMembersFromClub(+clubId);
  }

  @Get(':clubId/members/:socioId')
  findMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('socioId') socioId: string,
  ) {
    return this.clubSocioService.findMemberFromClub(+clubId, +socioId);
  }

  @Patch(':clubId/members')
  updateMembersFromClub(
    @Param('clubId') clubId: string,
    @Body() socioIds: number[],
  ) {
    return this.clubSocioService.updateMembersFromClub(+clubId, socioIds);
  }

  @Delete(':clubId/members/:socioId')
  deleteMemberFromClub(
    @Param('clubId') clubId: string,
    @Param('socioId') socioId: string,
  ) {
    return this.clubSocioService.deleteMemberFromClub(+clubId, +socioId);
  }
}
