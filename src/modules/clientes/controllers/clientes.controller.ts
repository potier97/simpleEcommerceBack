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
import { clientesDto, UpdateClientesDto } from '../dtos/clientes.dto';
import { ClientesService } from '../services/clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Get()
  getAll(): Promise<clientesDto[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number): Promise<clientesDto> {
    return this.clientesService.findOne(id);
  }

  @Post()
  create(@Body() body: clientesDto): Promise<clientesDto> {
    return this.clientesService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateClientesDto,
  ): Promise<clientesDto> {
    return this.clientesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.clientesService.delete(id);
  }
}
