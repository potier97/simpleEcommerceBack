import { FacturasService } from '../services/facturas.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FacturasDto } from '../dtos/facturas.dto';
import { facturas } from '../entities/facturas.entity';

@Controller('facturas')
export class FacturasController {
  constructor(private facturasService: FacturasService) {}

  @Get()
  getAll(): Promise<facturas[]> {
    return this.facturasService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number): Promise<facturas> {
    return this.facturasService.findOne(id);
  }

  @Post('registrar')
  create(@Body() body: FacturasDto): Promise<facturas> {
    return this.facturasService.create(body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.facturasService.delete(id);
  }
}
