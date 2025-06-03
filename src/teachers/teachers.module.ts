import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teachers } from './models/teacher.model';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [SequelizeModule.forFeature([Teachers]), MailModule],
  controllers: [TeachersController],
  providers: [TeachersService, MailService],
})
export class TeachersModule {}
