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
import { facturasDto, RegistrosDto } from '../dtos/facturas.dto';

@Controller('facturas')
export class FacturasController {
  constructor(private facturasService: FacturasService) {}

  @Get()
  getAll(): Promise<facturasDto[]> {
    return this.facturasService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number): Promise<facturasDto> {
    return this.facturasService.findOne(id);
  }

  @Post('registrar')
  create(@Body() body: RegistrosDto): Promise<facturasDto> {
    return this.facturasService.create(body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.facturasService.delete(id);
  }
}
