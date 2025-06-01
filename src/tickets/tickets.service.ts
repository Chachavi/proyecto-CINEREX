import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { FunctionEntity } from 'src/functions/entities/function.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(FunctionEntity)
    private functionRepository: Repository<FunctionEntity>,
    @InjectRepository(User)
    private userRepository: Repository<User>
){}

async create(createTicketDto: CreateTicketDto) {
  const func = await this.functionRepository.findOne({
    where: { functionId: createTicketDto.functionId },
  });
  if (!func) throw new NotFoundException('Function not found');

  const user = await this.userRepository.findOneBy({ userId: createTicketDto.userId });
  if (!user) throw new NotFoundException('User not found');

  const existingTicket = await this.ticketRepository.findOne({
    where: {
      seat: createTicketDto.seat,
      function: { functionId: createTicketDto.functionId },
    },
  });
  if (existingTicket) {
    throw new BadRequestException('That seat has been already taken');
  }

  const ticket = this.ticketRepository.create({
    seat: createTicketDto.seat,
    status: createTicketDto.status ?? 'reserved',
    function: func,
    user: user,
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

  async confirmTicket(id: string) {
  const ticket = await this.ticketRepository.findOne({
    where: { ticketId: id },
  });

  if (!ticket) {
    throw new NotFoundException('Ticket not found');
  }

  if (ticket.status === 'confirmed') {
    throw new BadRequestException('The ticket is already confirmed');
  }

  ticket.status = 'confirmed';
  return this.ticketRepository.save(ticket);
}

async getAllTicketsHistory() {
  return this.ticketRepository.find({
    relations: ['user', 'function', 'function.movie', 'function.room'],
    order: {createdAt: 'DESC'},
  });
}

async getAllTicketsHistoryByUser(id: string) {
  return this.ticketRepository.find({
    where: { user: { userId: id } },
    relations: ['user', 'function', 'function.movie', 'function.room'],
    order: { createdAt: 'DESC' },
  });
}

}
