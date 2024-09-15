import { Club } from 'src/club/entities/club.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Socio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombreUsuario: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fechaNacimiento: Date;

  @ManyToMany(() => Club, (club) => club.socios)
  clubs: Club[];
}
