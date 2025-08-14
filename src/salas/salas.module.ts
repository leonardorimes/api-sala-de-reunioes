import { Module } from '@nestjs/common';
import { SalasController } from './salas.controller';

@Module({
  controllers: [SalasController]
})
export class SalasModule {}
