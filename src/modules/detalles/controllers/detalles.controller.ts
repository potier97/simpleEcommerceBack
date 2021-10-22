import { DetallesService } from '../services/detalles.service';
import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { detallesDto } from '../dtos/detalles.dto';

@Controller('detalles')
export class DetallesController {
  constructor(private detallesService: DetallesService) {}

  @Get()
  getAll(): Promise<detallesDto[]> {
    return this.detallesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number): Promise<detallesDto> {
    return this.detallesService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.detallesService.delete(id);
  }
}
