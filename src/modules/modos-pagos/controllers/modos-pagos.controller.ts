import { ModosPagosService } from '../services/modos-pagos.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ModosPagosDto, UpdatModosPagosDto } from '../dtos/modospagos.dto';
import { modospagos } from '../entities/modospagos.entity';

@Controller('modos_pagos')
export class ModosPagosController {
  constructor(private modosPagosService: ModosPagosService) {}

  @Get()
  getAll(): Promise<modospagos[]> {
    return this.modosPagosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number): Promise<modospagos> {
    return this.modosPagosService.findOne(id);
  }

  @Post()
  create(@Body() body: ModosPagosDto): Promise<modospagos> {
    return this.modosPagosService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdatModosPagosDto,
  ): Promise<modospagos> {
    return this.modosPagosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.modosPagosService.delete(id);
  }
}
