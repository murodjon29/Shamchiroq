import { Module } from '@nestjs/common';
import { GroupTeachersService } from './group-teachers.service';
import { GroupTeachersController } from './group-teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Groups_teachers } from './models/group-teacher.models';

@Module({
  imports: [SequelizeModule.forFeature([Groups_teachers])],
  controllers: [GroupTeachersController],
  providers: [GroupTeachersService],
})
export class GroupTeachersModule { }
