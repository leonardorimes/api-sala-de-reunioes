import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { error } from 'console';
import { CreateRoomDto } from 'src/dto/create-room-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SalasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const allRooms = await this.prisma.sala.findMany({
      orderBy: {
        capacidade: 'desc',
      },
    });

    return allRooms;
  }

  async createRoom(createRomDto: CreateRoomDto) {
    const user = await this.prisma.sala.create({
      data: {
        capacidade: createRomDto.capacidade,
        equipamentos: createRomDto.equipamentos,
      },
      select: {
        id: true,
        capacidade: true,
        equipamentos: true,
      },
    });
    return user;
  }

  async updateRoom(id, createRomDto: CreateRoomDto) {
    const findRoom = await this.prisma.sala.findFirst({
      where: {
        id: id,
      },
    });

    if (!findRoom) {
      throw new HttpException('Essa Sala não existe', HttpStatus.NOT_FOUND);
    }

    const room = await this.prisma.sala.update({
      where: {
        id: findRoom.id,
      },
      data: {
        capacidade: createRomDto.capacidade
          ? createRomDto.capacidade
          : findRoom.id,
        equipamentos: createRomDto?.equipamentos
          ? createRomDto?.equipamentos
          : findRoom.equipamentos,
      },
    });

    return room;
  }

  async deleteRoom(id) {
    const findRoom = await this.prisma.sala.findFirst({
      where: {
        id: id,
      },
    });
    if (!findRoom) {
      throw new HttpException('Sala não encontrada', HttpStatus.BAD_REQUEST);
    }

    await this.prisma.sala.delete({
      where: {
        id: findRoom.id,
      },
    });

    return 'tarefa deletada com sucesso!';
  }
}
