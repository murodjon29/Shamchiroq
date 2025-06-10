import { Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vacancies } from './models/vacancy.model';

@Module({
  imports: [SequelizeModule.forFeature([Vacancies])],
  controllers: [VacanciesController],
  providers: [VacanciesService],
})
export class VacanciesModule {}
