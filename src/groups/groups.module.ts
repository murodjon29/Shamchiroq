import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Groups } from './models/group.model';

@Module({
  imports: [SequelizeModule.forFeature([Groups])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
