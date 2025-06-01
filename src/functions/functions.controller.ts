import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FunctionsService } from './functions.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('functions')
export class FunctionsController {
  constructor(private readonly functionsService: FunctionsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() createFunctionDto: CreateFunctionDto) {
    return this.functionsService.create(createFunctionDto);
  }

  @Get()
  findAll() {
    return this.functionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.functionsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFunctionDto: UpdateFunctionDto) {
    return this.functionsService.update(id, updateFunctionDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.functionsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/seats')
getAvailability(@Param('id') id: string) {
  return this.functionsService.getSeatAvailability(id);
}

}
