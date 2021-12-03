import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientesDto, UpdateClientesDto } from '../dtos/clientes.dto';
import { clientes } from '../entities/clientes.entity';
import { ClientesService } from '../services/clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Get()
  getAll(): Promise<clientes[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number): Promise<clientes> {
    return this.clientesService.findOne(id);
  }

  @Post()
  create(@Body() body: ClientesDto): Promise<clientes> {
    return this.clientesService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateClientesDto,
  ): Promise<clientes> {
    return this.clientesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.clientesService.delete(id);
  }
}
