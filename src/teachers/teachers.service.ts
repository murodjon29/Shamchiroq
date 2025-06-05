import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Res, UnauthorizedException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teachers } from './models/teacher.model';
import { decrypt, encrypt } from 'src/helpers/encrypt-decrypt';
import { handleError } from 'src/helpers/responseError';
import { SigninTeacherDto } from './dto/signinTeacher.dto';
import { generateOTP } from 'src/helpers/generate-otp';
import { MailService } from 'src/mail/mail.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { successRes } from 'src/helpers/success-response';
import { ConfirmSigninTeacherDto } from './dto/confirm-teacher.dto';
import { CryptoService } from 'src/utils/CryptoService';
import { TokenService } from 'src/utils/TokenService';
import { Response } from 'express';

@Injectable()
export class TeachersService {
  constructor(@InjectModel(Teachers) private model: typeof Teachers,
    private readonly mailService: MailService,
    private readonly cryptoService: CryptoService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tokenService: TokenService
  ) { }

  async create(createTeacherDto: CreateTeacherDto): Promise<object> {
    try {
      const { full_name, email, password, specialist } = createTeacherDto;
      const hashedPassword = await encrypt(password)
      const teacher = await this.model.create({ full_name, email, password: hashedPassword, specialist })
      return successRes(teacher, 201)
    } catch (error) {
      return handleError(error)
    }
  }

  async signinTeacher(signinTeacherDto: SigninTeacherDto): Promise<object> {
    try {
      const { email, password } = signinTeacherDto
      const teacher = await this.model.findOne({ where: { email } })
      if (!teacher) throw new BadRequestException("Email adress or password incorrect")
      const isMatchPassword = await decrypt(password, teacher.dataValues.password)
      if (!isMatchPassword) throw new BadRequestException("Email adress or password incorrect")
      const otp = generateOTP()

      await this.mailService.sendOTP(email, otp)
      await this.cacheManager.set(email, otp, 120000)
      return successRes(email)
    } catch (error) {
      return handleError(error)
    }

  }

  async confirmSignin(confirmSigninTeacherDto: ConfirmSigninTeacherDto, res: Response) {
    try {
      const { email, otp } = confirmSigninTeacherDto;
      const teacher = await this.model.findOne({ where: { email } })
      if (!teacher) throw new BadRequestException("Wrong email adress")
      const istureOtp = await this.cacheManager.get(email)
      if (!istureOtp || istureOtp !== otp) throw new BadRequestException("OTP experid")
      const payload = teacher.dataValues
      const accesToken = await this.tokenService.generateAccessToken(payload)      
      const refreshToken = await this.tokenService.generateRefreshToken(payload)
      
      await this.tokenService.writeToCookie(res, "refreshTokenTeacher", refreshToken)
      return successRes({ token: accesToken })
    } catch (error) {
      return handleError(error)
    }
  }

  async signoutTeacher(refreshToken: string, res: Response): Promise<object> {
    try {
      const decodedToken = await this.tokenService.verifyRefreshtoken(refreshToken)
      if (!decodedToken) throw new UnauthorizedException("Refresh token expired")
      await this.findTeacherById(decodedToken.id)
      res.clearCookie('refreshTokenTeacher');
      return successRes({ message: "Teacher signed out successfuly" })
    } catch (error) {
      return handleError(error)
    }
  }

  async findAll(): Promise<object | undefined> {
    try {
      const teachers = await this.model.findAll({ include: { all: true } })
      return successRes(teachers)
    } catch (error) {
      handleError(error)
    }
  }

  async findOne(id: number): Promise<object | undefined> {
    try {
      const teacher = await this.model.findByPk(id, { include: { all: true } })
      if (!teacher) {
        throw new NotFoundException("Teacher not found")
      }
      return successRes(teacher)
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<object | undefined> {
    try {
      if (!this.findTeacherById(id)) throw new NotFoundException("Teacher not found")

      const { email } = updateTeacherDto

      if (email) {
        const existEmail = await this.model.findOne({ where: { email } })
        if (id != existEmail?.dataValues.id) throw new ConflictException("Email address already exists");
      }
      const teacher = await this.model.update(updateTeacherDto, { where: { id }, returning: true })
      return successRes(teacher[1][0])
    } catch (error) {
      return handleError(error)
    }
  }

  async remove(id: number): Promise<object | undefined> {
    try {
      if (!await this.findTeacherById(id)) throw new NotFoundException("Teacher not found")
      await this.model.destroy({ where: { id } })
      return successRes({ message: "Teacher deleted succesfully" })
    } catch (error) {
      return handleError(error)
    }
  }

  async findTeacherById(id: number): Promise<Teachers> {
    const teacher = await this.model.findByPk(id);
    if (!teacher) throw new NotFoundException("Teacher not found")
    return teacher.dataValues;
  }
}
