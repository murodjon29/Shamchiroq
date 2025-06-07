import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ConfirmSignInAdminDto } from './dto/confirm-signin-admin';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum/index';
import { RolesGuard } from 'src/guards/roles.guard';

@UseInterceptors(CacheInterceptor)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.SUPERADMIN)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.createAdmin(createAdminDto);
  }

  @Post('signin')
  async signInAdmin(@Body() signInDto: CreateAdminDto) {
    return this.adminsService.signInAdmin(signInDto);
  }

  @Post('confirm-signin')
  async confirmSignInAdmin(
    @Body() confirmSignInAdminDto: ConfirmSignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.confirmSignInAdmin(confirmSignInAdminDto, res);
  }
}
