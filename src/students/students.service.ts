import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Students } from './models/student.model';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { handleError } from 'src/helpers/responseError';
import { decrypt, encrypt } from 'src/helpers/encrypt-decrypt';
import { successRes } from 'src/helpers/success-response';
import { SigninStudentDto } from './dto/signin-student.dto';
import { CryptoService } from 'src/utils/CryptoService';
import { FileService } from 'src/file/file.service';
import { MailService } from 'src/mail/mail.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { TokenService } from 'src/utils/TokenService';
import { generateOTP } from 'src/helpers/generate-otp';
import { ConfirmSignInAdminDto } from 'src/admins/dto/confirm-signin-admin';
import { Response } from 'express';

@Injectable()
export class StudentsService {
  confirmSigin(confirmSigninDto: ConfirmSignInAdminDto, res: unknown): Promise<object> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Students)
    private studentModel: typeof Students,
    private readonly cryptoService: CryptoService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Object | any> {
    try {
      const { password } = createStudentDto;
      const hashedPassword = await encrypt(password);
      const student = await this.studentModel.create({
        ...createStudentDto,
        password: hashedPassword,
      });
      return successRes(student, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async signinStudent(sigininStudentDto: SigninStudentDto) {
    try {
      const { email, password } = sigininStudentDto;
      const student = await this.studentModel.findOne({ where: { email } })
      if (!student) {
        throw new NotFoundException('Student not found');
      }
      const isMatchPassword = await this.cryptoService.decrypt(password, student.dataValues.password)
      if (!isMatchPassword) {
        throw new BadRequestException('Invalid credentials');
      }
      const otp = generateOTP()
      await this.mailService.sendOTP(email, otp)
      await this.cacheManager.set(email, otp, 120000)
      return successRes(email)
    } catch (error) {
      return handleError(error)
    }
  }


  async confirmSigninStudent(confirmSigninDto: ConfirmSignInAdminDto, res: Response): Promise<Object | any> {
    try {
      const { email, otp } = confirmSigninDto;
      const student = await this.studentModel.findOne({ where: { email } });
      if (!student) {
        throw new BadRequestException('Wrong email');
      }
      const cachedOtp = await this.cacheManager.get(email);
      if (!cachedOtp || cachedOtp !== otp) {
        throw new BadRequestException('Invalid or expired OTP');
      }
      const payload = { id: student.id, email: student.email };
      const accessToken = await this.tokenService.generateAccessToken(payload);
      const refreshToken = await this.tokenService.generateRefreshToken(payload);
      await this.tokenService.writeToCookie(res, 'refreshTokenStudent', refreshToken);
      return successRes({ token: accessToken })
    } catch (error) {
      return handleError(error);
    }
  }

  async signoutStudent(refreshToken: string, res: Response): Promise<Object | undefined> {
    try {
      const decodedToken = await this.tokenService.verifyRefreshToken(refreshToken);
      if (!decodedToken) {
        throw new UnauthorizedException('Refresh token expired or invalid');
      }
      await this.studentModel.findByPk(decodedToken.id)
      res.clearCookie('refreshTokenStudent');
      return successRes({ message: 'Signout successful' });
    } catch (error) {
      return handleError(error);
    }
  }

  async findAll(): Promise<Object | any> {
    try {
      const student = await this.studentModel.findAll({
        include: { all: true },
      });
      return successRes(student);
    } catch (error) {
      return handleError(error);
    }
  }

  async findOne(id: number): Promise<Object | null> {
    try {
      const student = await this.studentModel.findByPk(id, {
        include: { all: true },
      });

      if (!student) {
        throw new NotFoundException('');
      }
      return successRes(student);
    } catch (error) {
      return handleError(error);
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<object> {
    try {
      if (!(await this.studentModel.findByPk(id))) {
        throw new Error('Student not found');
      }
      const student = await this.studentModel.update(updateStudentDto, {
        where: { id },
        returning: true,
      });
      return successRes(student[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      if (!(await this.studentModel.findByPk(id))) {
        throw new NotFoundException('Sudent not found');
      }
      await this.studentModel.destroy({ where: { id } });
      return successRes({ message: 'Deleted successfully' });
    } catch (error) {
      return handleError(error);
    }
  }
}
