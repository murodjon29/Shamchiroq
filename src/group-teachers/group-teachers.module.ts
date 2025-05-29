import { Module } from '@nestjs/common';
import { GroupTeachersService } from './group-teachers.service';
import { GroupTeachersController } from './group-teachers.controller';

@Module({
  controllers: [GroupTeachersController],
  providers: [GroupTeachersService],
})
export class GroupTeachersModule {}
