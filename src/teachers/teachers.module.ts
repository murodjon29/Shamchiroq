import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teachers } from './models/teacher.model';

@Module({
  imports: [SequelizeModule.forFeature([Teachers])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
