import { MessagePattern } from '@nestjs/microservices';
import { Controller, Logger, ParseIntPipe, UsePipes } from '@nestjs/common';

//Importados
import { detalles } from '../entities/detalles.entity';
import {
  detailDeleteTp,
  detailGetAllTp,
  detailGetByIdTp,
} from '@configdata/path';
import { DetallesService } from '../services/detalles.service';

@Controller('detalles')
export class DetallesController {
  private readonly logger = new Logger(DetallesController.name);

  constructor(private detallesService: DetallesService) {}

  @MessagePattern(detailGetAllTp)
  async getAll(): Promise<detalles[]> {
    return this.detallesService.findAll();
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(detailGetByIdTp)
  async getOne(id: number): Promise<detalles> {
    return this.detallesService.findOne(id);
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(detailDeleteTp)
  async delete(id: number): Promise<boolean> {
    return this.detallesService.delete(id);
  }
}
