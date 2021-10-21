import { FacturasService } from '../services/facturas.service';
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
import { facturasDto, UpdateFacturasDto } from '../dtos/facturas.dto';

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

  @Post()
  create(@Body() body: facturasDto): Promise<facturasDto> {
    return this.facturasService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateFacturasDto,
  ): Promise<facturasDto> {
    return this.facturasService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.facturasService.delete(id);
  }
}
