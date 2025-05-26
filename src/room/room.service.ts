import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
 constructor(
  @InjectRepository(Room)
  private roomRepository: Repository<Room>
 ){}

 create(createRoomDto: CreateRoomDto) {
  return this.roomRepository.save(createRoomDto)
 }

 findAll(){
  return this.roomRepository.find()
 }

 findOne(id: string) {
  const room = this.roomRepository.findOneBy({
    roomId: id
  });
  if (!room) throw new NotFoundException()
    return room;
 }

 async update(id: string, updateRoomDto: UpdateRoomDto){
  const roomToUpdate = await this.roomRepository.preload({
    roomId: id,
    ...updateRoomDto
  });
  if (!roomToUpdate) throw new NotFoundException(`Room with id ${id} not found`)
    return this.roomRepository.save(roomToUpdate)
 }

 remove(id: string){
  const room = this.roomRepository.delete({
    roomId: id
  });
  if (!room) throw new NotFoundException(`Room with id ${id} not found`)
    return `Room with id ${id} successfully deleted`;
 }
}
