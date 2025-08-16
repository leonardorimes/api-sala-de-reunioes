import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SalasService } from './salas.service';
import { CreateRoomDto } from 'src/dto/create-room-dto';

@Controller('salas')
export class SalasController {
  constructor(private readonly salasservice: SalasService) {}

  @Post('/')
  createRoom(@Body() createRomDto: CreateRoomDto) {
    return this.salasservice.createRoom(createRomDto);
  }

  @Get('/')
  findAllRooms() {
    return this.salasservice.findAll();
  }

  @Patch('/:id')
  updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateRoomDto: CreateRoomDto,
  ) {
    return this.salasservice.updateRoom(id, CreateRoomDto);
  }

  @Delete('/:id')
  deleteRoom(@Param('id', ParseIntPipe) id: number) {
    return this.salasservice.deleteRoom(id);
  }
}
