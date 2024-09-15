import { Socio } from 'src/socio/entities/socio.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  fechaFundacion: Date;

  @Column()
  imagen: string;

  @Column({ length: 100 })
  descripcion: string;

  @ManyToMany(() => Socio, (socio) => socio.clubs)
  @JoinTable()
  socios: Socio[];
}
