import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async authenticate(signInDto: SignInDto) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new HttpException(
        'Falha ao autenticar o login',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passwordIsValid = await this.hashingService.compare(
      signInDto.senha,
      user.senha,
    );

    if (!passwordIsValid) {
      throw new HttpException(
        'senha/usuario incorretos',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
