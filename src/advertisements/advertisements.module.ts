import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Advertisements } from './models/advertisement.models';

@Module({
  imports: [SequelizeModule.forFeature([Advertisements])],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
})
export class AdvertisementsModule {}
