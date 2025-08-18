import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashingServiceProtocol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    { provide: HashingServiceProtocol, useClass: BcryptService },
    AuthService,
  ],
  exports: [HashingServiceProtocol],
  controllers: [AuthController],
})
export class AuthModule {}
