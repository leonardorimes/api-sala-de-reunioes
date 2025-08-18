import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingServiceProtocol } from 'src/auth/hash/hashing.service';

@Injectable()
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private readonly hashingService: HashingServiceProtocol,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const passwordHash = await this.hashingService.hash(
        createUsuarioDto.senha,
      );

      console.log(passwordHash);

      const user = await this.prisma.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          senha: passwordHash,
          email: createUsuarioDto.email,
          cargo: createUsuarioDto.cargo,
          salario: createUsuarioDto.salario,
        },
        select: {
          id: true,
          nome: true,
          email: true,
        },
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falha ao cadastrar o usuario',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    const allUsers = await this.prisma.usuario.findMany({
      take: 10,
      skip: 0,
    });

    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new HttpException(
        'Usuario não foi encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const findUser = await this.prisma.usuario.findFirst({
        where: {
          id: id,
        },
      });

      if (!findUser) {
        throw new HttpException(
          'Esse usuario não existe',
          HttpStatus.NOT_FOUND,
        );
      }
      const usuario = await this.prisma.usuario.update({
        where: {
          id: findUser?.id,
        },
        data: {
          nome: updateUsuarioDto.nome ? updateUsuarioDto?.nome : findUser?.nome,
          senha: updateUsuarioDto.senha
            ? updateUsuarioDto?.senha
            : findUser?.senha,
          email: updateUsuarioDto.email
            ? updateUsuarioDto?.email
            : findUser?.email,
          cargo: updateUsuarioDto.cargo
            ? updateUsuarioDto?.cargo
            : findUser?.cargo,
          salario: updateUsuarioDto.salario
            ? updateUsuarioDto?.salario
            : findUser?.salario,
        },
      });

      return usuario;
    } catch (err) {
      throw new HttpException(
        'falha ao atualizar essa tarefa',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number) {
    try {
      const findUser = await this.prisma.usuario.findFirst({
        where: {
          id: id,
        },
      });

      if (!findUser) {
        throw new HttpException(
          'Esse usuário não existe',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.prisma.usuario.delete({
        where: {
          id: findUser.id,
        },
      });
      return {
        message: 'Tarefa deletada com sucesso!',
      };
    } catch (err) {
      throw new HttpException(
        'Falha ao deletar a tarefa',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
