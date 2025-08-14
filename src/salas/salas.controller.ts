import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('salas')
export class SalasController {
  constructor() {}

  @Post('/')
  createRoom() {
    return 'criando sala de reunião';
  }

  @Get('/')
  findAllRooms() {
    return 'lista todas as room';
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
