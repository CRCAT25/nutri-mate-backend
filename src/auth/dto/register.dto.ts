import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('VN') // hoặc bỏ đi nếu không dùng format cụ thể
  @IsOptional()
  phone?: string;

  @IsString()
  @MinLength(6)
  password: string;
}
