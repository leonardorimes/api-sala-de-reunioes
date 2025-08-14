import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalasModule } from './salas/salas.module';
import { ReservasModule } from './reservas/reservas.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SalasModule, ReservasModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
