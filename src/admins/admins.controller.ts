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
  ParseIntPipe,
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
import { GetCookie } from 'src/decorators/cookie.decarator';
import { SelfGuard } from 'src/guards/self.guard';

@UseInterceptors(CacheInterceptor)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.SUPERADMIN)
  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Post('signin')
  async signInAdmin(@Body() signInDto: CreateAdminDto) {
    return this.adminService.signInAdmin(signInDto);
  }

  @Post('confirm-signin')
  async confirmSignInAdmin(
    @Body() confirmSignInAdminDto: ConfirmSignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.confirmSignInAdmin(confirmSignInAdminDto, res);
  }

  @Post('token')
  async refreshTokenAdmin(
    @GetCookie('refreshTokenAdmin') refreshToken: string,
  ) {
    return this.adminService.refreshTokenAdmin(refreshToken);
  }

  @Post('signout')
  async signOutAdmin(
    @GetCookie('refreshTokenAdmin') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signOutAdmin(refreshToken, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.SUPERADMIN)
  @Get()
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  async getAdminById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminById(id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  async updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.SUPERADMIN)
  @Delete(':id')
  async deleteAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteAdmin(id);
  }
}
