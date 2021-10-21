import { ProductosService } from '../services/productos.service';
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
import { productosDto, UpdateProductosDto } from '../dtos/productos.dto';

@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Get()
  getAll(): Promise<productosDto[]> {
    return this.productosService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseIntPipe()) id: number): Promise<productosDto> {
    return this.productosService.findOne(id);
  }

  @Post()
  create(@Body() body: productosDto): Promise<productosDto> {
    return this.productosService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: UpdateProductosDto,
  ): Promise<productosDto> {
    return this.productosService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    return this.productosService.delete(id);
  }
}
