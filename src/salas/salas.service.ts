import { Injectable } from '@nestjs/common';
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
}
