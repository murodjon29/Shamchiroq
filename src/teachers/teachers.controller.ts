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

@UseInterceptors(CacheInterceptor)
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) { }

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Post("signin")
  signinTeacher(@Body() signinTeacherDto: SigninTeacherDto) {
    return this.teachersService.signinTeacher(signinTeacherDto)
  }

  @Post('confirm-signin')
  confirmSignin(
    @Body() confirmSigninTeacherDto: ConfirmSigninTeacherDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teachersService.confirmSignin(confirmSigninTeacherDto, res)
  }

  @Get('signout')
  signoutTeacher(@GetCookie('refreshTokenTeacher') refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) { return this.teachersService.signoutTeacher(refreshToken, res) }


  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
