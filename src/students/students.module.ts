import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Students } from './models/student.model';
import { Group_students } from 'src/group-students/models/group-student.model';
import { Projects } from 'src/projects/models/project.model';
import { Students_projects } from 'src/student-project/model/student-project.entity';
import { FileService } from 'src/file/file.service';
import { MailModule } from 'src/mail/mail.module';
import { CryptoService } from 'src/utils/CryptoService';
import { TokenService } from 'src/utils/TokenService';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Students,
      Group_students,
      Projects,
      Students_projects,
    ]), MailModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService, CryptoService, TokenService],
})
export class StudentsModule {}
