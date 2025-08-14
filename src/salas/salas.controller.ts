import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SalasService } from './salas.service';

@Controller('salas')
export class SalasController {
  constructor(private readonly salasservice: SalasService) {}

  @Post('/')
  createRoom() {
    return 'criando sala de reunião';
  }

  @Get('/')
  findAllRooms() {
    return this.salasservice.findAll();
  }

  @Patch('/:id')
  updateRoom() {
    return 'atualizar sala';
  }

  @Delete('/:id')
  deleteRoom() {
    return 'deletar sala';
  }
}
