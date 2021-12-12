import { Controller, Logger, ParseIntPipe, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

//Importados
import { FacturasDto } from '../dtos/facturas.dto';
import { facturas } from '../entities/facturas.entity';
import {
  invoiceDeleteTp,
  invoiceGetAllTp,
  invoiceGetByIdTp,
  newBuyTp,
} from '@configdata/path';
import { FacturasService } from '../services/facturas.service';

@Controller('facturas')
export class FacturasController {
  private readonly logger = new Logger(FacturasController.name);

  constructor(private facturasService: FacturasService) {}

  @MessagePattern(invoiceGetAllTp)
  async getAll(): Promise<facturas[]> {
    return this.facturasService.findAll();
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(invoiceGetByIdTp)
  async getOne(id: number): Promise<facturas> {
    return this.facturasService.findOne(id);
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(invoiceDeleteTp)
  async delete(id: number): Promise<boolean> {
    return this.facturasService.delete(id);
  }

  @MessagePattern(newBuyTp)
  async newBuyRegister(body: FacturasDto): Promise<facturas> {
    return this.facturasService.create(body);
  }
}
