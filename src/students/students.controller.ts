import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CheckRoles } from 'src/decorators/role.decorator';
import { Role } from 'src/enum';
import { SelfGuard } from 'src/guards/self.guard';
import { SigninStudentDto } from './dto/signin-student.dto';
import { ConfirmSignInAdminDto } from 'src/admins/dto/confirm-signin-admin';
import { Response } from 'express';
import { GetCookie } from 'src/decorators/cookie.decarator';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<object> {
    return this.studentsService.create(createStudentDto);
  }

  @Post('signin')
  signinSrudnet(@Body() sigininStudentDto: SigninStudentDto): Promise<object> {
    return this.studentsService.signinStudent(sigininStudentDto);
  }

  @Post('confirm-otp')
  confirmSigninStudent(@Body() confirmSigninDto: ConfirmSignInAdminDto, @Res({ passthrough: true }) res: Response ): Promise<object> {
    return this.studentsService.confirmSigninStudent(confirmSigninDto, res);
  }

  @Post('signout')
  signoutStudent(@GetCookie('refreshTokenStudent') refreshToken: string,  @Res({ passthrough: true }) res: Response): Promise<object | undefined> {
    return this.studentsService.signoutStudent(refreshToken, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Get()
  findAll(): Promise<object> {
    return this.studentsService.findAll();
  }

  @UseGuards(AuthGuard, SelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<object | null> {
    return this.studentsService.findOne(+id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<object> {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @CheckRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<object | undefined> {
    return this.studentsService.remove(+id);
  }
}
