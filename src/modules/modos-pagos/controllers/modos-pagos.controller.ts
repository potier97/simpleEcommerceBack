import { Controller, Logger, ParseIntPipe, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

//Importados
import { ModosPagosDto, UpdatModosPagosDto } from '../dtos/modospagos.dto';
import { modospagos } from '../entities/modospagos.entity';
import {
  payModeCreateTp,
  payModeDeleteTp,
  payModeGetAllTp,
  payModeGetByIdTp,
  payModeUpdateTp,
} from '@configdata/path';
import { ModosPagosService } from '../services/modos-pagos.service';

@Controller('modos_pagos')
export class ModosPagosController {
  private readonly logger = new Logger(ModosPagosController.name);

  constructor(private modosPagosService: ModosPagosService) {}

  @MessagePattern(payModeGetAllTp)
  async getAll(): Promise<modospagos[]> {
    return this.modosPagosService.findAll();
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(payModeGetByIdTp)
  async getOne(id: number): Promise<modospagos> {
    return this.modosPagosService.findOne(id);
  }

  @MessagePattern(payModeCreateTp)
  async create(body: ModosPagosDto): Promise<modospagos> {
    return this.modosPagosService.create(body);
  }

  @MessagePattern(payModeUpdateTp)
  async update(data: any): Promise<modospagos> {
    const id: number = data.id;
    const body: UpdatModosPagosDto = data.body;
    return this.modosPagosService.update(id, body);
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(payModeDeleteTp)
  async delete(id: number): Promise<boolean> {
    return this.modosPagosService.delete(id);
  }
}
