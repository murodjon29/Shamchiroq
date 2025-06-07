import { Module } from '@nestjs/common';
import { AdminService } from './admins.service';
import { AdminsController } from './admins.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admins } from './models/admin.model';
import { CryptoService } from 'src/utils/CryptoService';
import { MailModule } from 'src/mail/mail.module';
import { TokenService } from 'src/utils/TokenService';

@Module({
  imports: [SequelizeModule.forFeature([Admins]), MailModule],
  controllers: [AdminsController],
  providers: [AdminService, CryptoService, TokenService],
})
export class AdminsModule {}
