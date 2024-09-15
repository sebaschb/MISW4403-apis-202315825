import { IsString, IsDate, MaxLength } from 'class-validator';

export class CreateClubDto {
  @IsString()
  nombre: string;

  @IsDate()
  fechaFundacion: Date;

  @IsString()
  imagen: string;

  @IsString()
  @MaxLength(100, {
    message: 'La descripción no puede exceder los 100 caracteres',
  })
  descripcion: string;
}
