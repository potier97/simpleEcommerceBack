import { DetallesService } from '../services/detalles.service';
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
import { detallesDto, UpdateDetallesDto } from '../dtos/detalles.dto';

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

  @Post()
  create(@Body() body: detallesDto): Promise<detallesDto> {
    return this.detallesService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateDetallesDto,
  ): Promise<detallesDto> {
    return this.detallesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.detallesService.delete(id);
  }
}
