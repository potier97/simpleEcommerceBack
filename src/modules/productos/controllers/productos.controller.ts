import { Controller, Logger, ParseIntPipe, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

//Importados
import { ProductosDto, UpdateProductosDto } from '../dtos/productos.dto';
import { productos } from '../entities/productos.entity';
import {
  productCreateTp,
  productDeleteTp,
  productGetAllTp,
  productGetByIdTp,
  productUpdateTp,
} from '@configdata/path';
import { ProductosService } from '../services/productos.service';

@Controller('productos')
export class ProductosController {
  private readonly logger = new Logger(ProductosController.name);

  constructor(private productosService: ProductosService) {}

  @MessagePattern(productGetAllTp)
  async getAll(): Promise<productos[]> {
    return this.productosService.findAll();
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(productGetByIdTp)
  async getOne(id: number): Promise<productos> {
    return this.productosService.findOne(id);
  }

  @MessagePattern(productCreateTp)
  async create(body: ProductosDto): Promise<productos> {
    return this.productosService.create(body);
  }

  @MessagePattern(productUpdateTp)
  async update(data: any): Promise<productos> {
    const id: number = data.id;
    const body: UpdateProductosDto = data.body;
    return this.productosService.update(id, body);
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(productDeleteTp)
  async delete(id: number): Promise<boolean> {
    return this.productosService.delete(id);
  }
}
