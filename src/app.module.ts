import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AdminsModule } from './admins/admins.module';
import { TeachersModule } from './teachers/teachers.module';
import { LessonModule } from './lesson/lesson.module';
import { GroupsModule } from './groups/groups.module';
import { GroupTeachersModule } from './group-teachers/group-teachers.module';
import { StudentProjectModule } from './student-project/student-project.module';
import { VideosOfTeachersModule } from './videos-of-teachers/videos-of-teachers.module';
import { GroupStudentsModule } from './group-students/group-students.module';
import { ProjectsModule } from './projects/projects.module';
import { BooksModule } from './books/books.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { VideosOfProjectsModule } from './videos-of-projects/videos-of-projects.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { Students } from './students/models/student.model';
import { Lessons } from './lesson/models/lesson.model';
import { Teachers } from './teachers/models/teacher.model';
import { Projects } from './projects/models/project.model';
import { Books } from './books/models/book.model';
import { Groups_teachers } from './group-teachers/models/group-teacher.models';
import { Group_students } from './group-students/models/group-student.model';
import { Groups } from './groups/models/group.model';
import { Students_projects } from './student-project/model/student-project.entity';
import { Vacancies } from './vacancies/models/vacancy.model';
import { Videos_of_teachers } from './videos-of-teachers/models/videos-of-teacher.model';
import { Videos_of_project } from './videos-of-projects/models/videos-of-project.model';
import { Admins } from './admins/models/admin.model';
import { Advertisements } from './advertisements/models/advertisement.models';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: config.PG_HOST,
      port: config.PG_PORT,
      username: config.PG_USER,
      password: config.PG_PASS,
      database: config.PG_DB,
      logging: false,
      synchronize: true,
      autoLoadModels: true,
      models: [
        Students,
        Lessons,
        Teachers,
        Projects,
        Books,
        Groups_teachers,
        Group_students,
        Groups,
        Students_projects,
        Vacancies,
        Videos_of_teachers,
        Videos_of_project,
        Admins,
        Advertisements,
        
      ],
    }),
    StudentsModule,
    AdminsModule,
    TeachersModule,
    LessonModule,
    GroupsModule,
    GroupTeachersModule,
    StudentProjectModule,
    VideosOfTeachersModule,
    GroupStudentsModule,
    ProjectsModule,
    BooksModule,
    VacanciesModule,
    AdvertisementsModule,
    VideosOfProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
