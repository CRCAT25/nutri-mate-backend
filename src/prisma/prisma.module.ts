import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Dùng @Global để không cần import ở nhiều nơi
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
