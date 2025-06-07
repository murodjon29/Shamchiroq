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
  ParseIntPipe,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { SigninTeacherDto } from './dto/signinTeacher.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ConfirmSigninTeacherDto } from './dto/confirm-teacher.dto';
import { Response } from 'express';
import { GetCookie } from 'src/decorators/cookie.decarator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';

@UseInterceptors(CacheInterceptor)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto): Promise<object> {
    return this.teachersService.create(createTeacherDto);
  }

  @Post('signin')
  signinTeacher(@Body() signinTeacherDto: SigninTeacherDto) {
    return this.teachersService.signinTeacher(signinTeacherDto);
  }

  @Post('confirm-signin')
  confirmSignin(
    @Body() confirmSigninTeacherDto: ConfirmSigninTeacherDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.teachersService.confirmSignin(confirmSigninTeacherDto, res);
  }

  @Get('signout')
  signoutTeacher(
    @GetCookie('refreshTokenTeacher') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.teachersService.signoutTeacher(refreshToken, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object | undefined> {
    return this.teachersService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object | undefined> {
    return this.teachersService.findOne(+id);
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<object | undefined> {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object | undefined> {
    return this.teachersService.remove(+id);
  }
}
