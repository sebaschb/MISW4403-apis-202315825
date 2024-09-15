import { IsString, IsEmail, IsDate } from 'class-validator';

export class CreateSocioDto {
  @IsString()
  nombreUsuario: string;

  @IsEmail()
  email: string;

  @IsDate()
  fechaNacimiento: Date;
}
