import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocioModule } from './socio/socio.module';
import { ClubModule } from './club/club.module';
import { ClubSocioModule } from './club-socio/club-socio.module';
import { Socio } from './socio/entities/socio.entity';
import { Club } from './club/entities/club.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'club_social.sqlite',
      entities: [Socio, Club],
      synchronize: true,
    }),
    SocioModule,
    ClubModule,
    ClubSocioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
