import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teachers } from './models/teacher.model';
import { MailModule } from 'src/mail/mail.module';
import { CryptoService } from 'src/utils/CryptoService';
import { TokenService } from 'src/utils/TokenService';


@Module({
  imports: [SequelizeModule.forFeature([Teachers]), MailModule],
  controllers: [TeachersController],
  providers: [TeachersService, CryptoService, TokenService],
})
export class TeachersModule {}
