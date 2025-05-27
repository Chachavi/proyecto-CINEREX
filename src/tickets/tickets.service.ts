import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { FunctionEntity } from 'src/functions/entities/function.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(FunctionEntity)
    private functionRepository: Repository<FunctionEntity>
){}

async create(createTicketDto: CreateTicketDto){
  // Verificar que la función existe
  const func = await this.functionRepository.findOne({
    where: {functionId: createTicketDto.functionId},
  });
  if (!func) throw new NotFoundException('Function not found');

    // Verificar asientos disponibles
  const existingTicket = await this.ticketRepository.findOne({
    where: {
    seat: createTicketDto.seat, 
    function: {functionId: createTicketDto.functionId}
    },
  });
  if (existingTicket) {
    throw new BadRequestException('That seat has been already taken');
    }
  // Crear y guardar ticket
  const ticket = this.ticketRepository.create({
    seat: createTicketDto.seat,
    function: func,
  });
  return this.ticketRepository.save(ticket);
  }

  findAll(){
  return this.ticketRepository.find()
  }

  findOne(id: string){
  const ticket = this.ticketRepository.findOneBy({
    ticketId: id
  });
  if (!ticket) throw new NotFoundException()
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto){
  const ticketToUpdate = await this.ticketRepository.preload({
  ticketId: id,
  ...updateTicketDto
  });
  if (!ticketToUpdate) throw new NotFoundException(`Ticket with id ${id} not found`)
    return this.ticketRepository.save(ticketToUpdate)
  }

  remove(id: string){
  const ticket = this.ticketRepository.delete({
    ticketId: id
  });
  if (!ticket) throw new NotFoundException(`Ticket with id ${id} not found`)
    return `Ticket with id ${id} successfully deleted`
  }

}
