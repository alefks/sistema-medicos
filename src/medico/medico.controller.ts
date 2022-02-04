import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MedicoService } from './medico.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: CreateMedicoDto) {
    return await this.medicoService.create(dto);
  }

  @Get()
  @UsePipes(ValidationPipe)
  findAll() {
    return this.medicoService.findAll();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: number) {
    return this.medicoService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: number, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicoService.update(id, updateMedicoDto);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  remove(@Param('id') id: number) {
    return this.medicoService.softDelete(id);
  }
}
