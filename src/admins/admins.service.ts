import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admins } from './models/admin.model';
import { handleError } from 'src/helpers/responseError';
import { CryptoService } from 'src/utils/CryptoService';
import config from 'src/config';
import { Role } from 'src/enum/index';
import { generateOTP } from 'src/helpers/generate-otp';
import { successRes } from 'src/helpers/success-response';
import { MailService } from 'src/mail/mail.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfirmSignInAdminDto } from './dto/confirm-signin-admin';
import { TokenService } from 'src/utils/TokenService';
import { Response } from 'express';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(Admins) private adminModel: typeof Admins,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tokenService: TokenService,
  ) {}

  async onModuleInit(): Promise<void> {
    try {
      const isSuperAdmin = await this.adminModel.findOne({
        where: { role: Role.SUPERADMIN },
      });
      if (!isSuperAdmin) {
        const hashedPassword = await this.cryptoService.encrypt(
          config.SUPERADMIN_PASSWORD,
        );
        await this.adminModel.create({
          username: config.SUPERADMIN_USERNAME,
          email: config.SUPERADMIN_EMAIL,
          password: hashedPassword,
          role: Role.SUPERADMIN,
        });
      }
    } catch (error) {
      return handleError(error);
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<object> {
    try {
      const { email, password } = createAdminDto;
      const existsEmail = await this.adminModel.findOne({
        where: { email },
      });
      if (existsEmail) {
        throw new ConflictException('Email address already exists');
      }
      const hashedPassword = await this.cryptoService.encrypt(password);
      const admin = await this.adminModel.create({
        email,
        password: hashedPassword,
      });
      return successRes(admin, 201);
    } catch (error) {
      return handleError(error);
    }
  }

  async signInAdmin(signInDto: CreateAdminDto): Promise<object> {
    try {
      const { email, password } = signInDto;
      const admin = await this.adminModel.findOne({ where: { email } });
      if (!admin) {
        throw new BadRequestException('Email address or password incorrect');
      }      
      const isMatchPassword = await this.cryptoService.decrypt(
        password,
        admin.dataValues?.password,
      );
      if (!isMatchPassword) {
        throw new BadRequestException('Email address or password incorrect');
      }
      const otp = generateOTP();
      await this.mailService.sendOTP(email, otp);
      await this.cacheManager.set(email, otp, 120000);
      return successRes(email);
    } catch (error) {
      return handleError(error);
    }
  }

  async confirmSignInAdmin(
    confirmSignInAdminDto: ConfirmSignInAdminDto,
    res: Response,
  ): Promise<object> {
    try {
      const { email, otp } = confirmSignInAdminDto;
      const admin = await this.adminModel.findOne({ where: { email } });
      if (!admin) {
        throw new BadRequestException('Wrong email address');
      }
      const isTrueOTP = await this.cacheManager.get(email);
      if (!isTrueOTP || isTrueOTP != otp) {
        throw new BadRequestException('OTP expired');
      }
      const { id, role } = admin.dataValues;
      const payload = { id, role };
      const accessToken = await this.tokenService.generateAccessToken(payload);
      const refreshToken =
        await this.tokenService.generateRefreshToken(payload);
      await this.tokenService.writeToCookie(
        res,
        'refreshTokenAdmin',
        refreshToken,
      );
      return successRes(accessToken);
    } catch (error) {
      return handleError(error);
    }
  }
  async refreshTokenAdmin(refreshToken: string): Promise<object> {
    const decodedToken =
      await this.tokenService.verifyRefreshToken(refreshToken);
    if (!decodedToken) {
      throw new UnauthorizedException('Refresh token expired');
    }
    const admin = await this.findAdminById(decodedToken.id);
    const payload = {
      id: admin.id,
      role: admin.role,
    };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    return successRes({ token: accessToken });
  }

  async signOutAdmin(refreshToken: string, res: Response): Promise<object> {
    try {
      const decodedToken =
        await this.tokenService.verifyRefreshToken(refreshToken);
      if (!decodedToken) {
        throw new UnauthorizedException('Refresh token expired');
      }
      await this.findAdminById(decodedToken.id);
      res.clearCookie('refreshTokenAdmin');
      return successRes({ message: 'Admin signed out successfully' });
    } catch (error) {
      return handleError(error);
    }
  }

  async getAllAdmins(): Promise<object> {
    try {
      const admins = await this.adminModel.findAll();
      return successRes(admins);
    } catch (error) {
      return handleError(error);
    }
  }

  async getAdminById(id: number): Promise<object> {
    try {
      const admin = await this.findAdminById(id);
      return successRes(admin);
    } catch (error) {
      return handleError(error);
    }
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<object> {
    try {
      const admin = await this.findAdminById(id);
      const { email } = updateAdminDto;
      if (email) {
        const existsEmail = await this.adminModel.findOne({ where: { email } });
        if (id != existsEmail?.dataValues.id) {
          throw new ConflictException('Email address already exists');
        }
      }
      const updatedAdmin = await this.adminModel.update(
        {
          ...updateAdminDto,
        },
        { where: { id }, returning: true },
      );
      return successRes(updatedAdmin[1][0]);
    } catch (error) {
      return handleError(error);
    }
  }

  async deleteAdmin(id: number): Promise<object> {
    try {
      const admin = await this.findAdminById(id);
      await this.adminModel.destroy({ where: { id } });
      return successRes({ message: 'Admin deleted successfully' });
    } catch (error) {
      return handleError(error);
    }
  }

  async findAdminById(id: number): Promise<Admins> {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`Admin not found by ID ${id}`);
    }
    return admin.dataValues;
  }
}
