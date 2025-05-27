import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { FunctionEntity } from 'src/functions/entities/function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, FunctionEntity])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
