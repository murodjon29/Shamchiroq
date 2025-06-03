import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class TeachersService {
  constructor(@InjectModel(Teachers) private model: typeof Teachers,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }
  async create(createTeacherDto: CreateTeacherDto): Promise<object> {
    try {
      const { full_name, email, password, specialist } = createTeacherDto;
      const hashedPassword = await encrypt(password)
      const teacher = await this.model.create({ full_name, email, password: hashedPassword, specialist })
      return { statusCode: 201, message: "Success", data: teacher }
    } catch (error) {
      return handleError(error)
    }
  }

  async signinTeacher(signinTeacherDto: SigninTeacherDto) {
    try {
      const { email, password } = signinTeacherDto
      const teacher = await this.model.findOne({ where: { email } })
      if (!teacher) throw new BadRequestException("Email adress or password incorrect")
      const isMatchPassword = await decrypt(password, teacher.dataValues.password)
      if (!isMatchPassword) throw new BadRequestException("Email adress or password incorrect")
      const otp = generateOTP()

      await this.mailService.sendOTP(email, otp)
      await this.cacheManager.set(email, otp, 120000)
      return { statusCode: 200, message: "Success", data: email }
    } catch (error) {
      return handleError(error)
    }

  }

  async findAll(): Promise<object | undefined> {
    try {
      const teachers = await this.model.findAll({ include: { all: true } })
      return { statusCode: 200, message: "Success", data: teachers }
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
      return { statusCode: 200, message: "Success", data: teacher }
    } catch (error) {
      handleError(error)
    }
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<object | undefined> {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException("Teacher not found")
      }
      const teacher = await this.model.update(updateTeacherDto, { where: { id }, returning: true })
      return { statusCode: 200, message: "Success", data: teacher[1][0] }
    } catch (error) {
      handleError(error)
    }
  }

  async remove(id: number): Promise<object | undefined> {
    try {
      if (!await this.model.findByPk(id)) {
        throw new NotFoundException("Teacher not found")
      }
      await this.model.destroy({ where: { id } })
      return { statusCode: 200, message: "Success", data: {} }
    } catch (error) {
      handleError(error)
    }
  }
}
