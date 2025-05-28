import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
 constructor(
  @InjectRepository(User)
  private userRepository: Repository<User>
 ){}

 registerUser(createUserDto: CreateUserDto){
  createUserDto.userPass = bcrypt.hashSync(createUserDto.userPass, 5)
  return this.userRepository.save(createUserDto)
 }

async loginUser(createUserDto: CreateUserDto){
  const user = await this.userRepository.findOne({
   where: {
    email: createUserDto.email
   }
  })
  if(!user) throw new UnauthorizedException("Invalid credentials")
  const match = await bcrypt.compare(createUserDto.userPass, user.userPass)
   if (!match) throw new UnauthorizedException("You are not authorized")
    return user;
  }

  async findByEmail(email: string) {
  return this.userRepository.findOne({ where: { email } });
}

findAll(){
return this.userRepository.find()
}

findOne(id: string){
return this.userRepository.findOne({
  where: {userId: id}
})
}

async update(id: string, updateUserDto: UpdateUserDto) {
  const user = await this.userRepository.findOne({ where: { userId: id } });
  if (!user) throw new BadRequestException('User not found');
  Object.assign(user, updateUserDto);
  return this.userRepository.save(user);
}


async remove(id: string) {
  const user = await this.userRepository.findOne({ 
    where: { userId: id } 
  });
  if (!user) throw new BadRequestException('User not found');
  await this.userRepository.remove(user);
  return { message: `User with id ${id} deleted successfully` };
}

}
