import { IsNumber } from 'class-validator';

export class CreateClubSocioDto {
  @IsNumber()
  socioId: number;

  @IsNumber()
  clubId: number;
}
