import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const {
      email,
      phone,
      password,
    }: { email?: string; phone?: string; password: string } = dto;

    if (!email && !phone) {
      throw new BadRequestException('Phải cung cấp email hoặc số điện thoại');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email ?? undefined }, { phone: phone ?? undefined }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email hoặc số điện thoại đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: email ?? '',
        phone: phone ?? null,
        password: hashedPassword,
      },
    });

    return { message: 'Đăng ký thành công', userId: user.id };
  }

  async login(dto: LoginDto) {
    const {
      email,
      phone,
      password,
    }: { email?: string; phone?: string; password: string } = dto;

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email ?? undefined }, { phone: phone ?? undefined }],
      },
    });

    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Sai mật khẩu');
    }

    return { message: 'Đăng nhập thành công', userId: user.id };
  }
}
