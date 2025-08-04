import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;

  @IsString()
  password: string;
}
