import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productosDto, UpdateProductosDto } from '../dtos/productos.dto';
import { productos } from '../entities/productos.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(productos)
    private productosRepo: Repository<productos>,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<productosDto[]> {
    return await this.productosRepo.find();
  }

  //Encuentra un recurso por el id
  async findOne(id: number): Promise<productosDto> {
    const result = await this.productosRepo.findOne(id);
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontrado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  //Crea un recurso
  async create(body: productosDto): Promise<productosDto> {
    if (body === null || body === undefined) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No proporcionó un id',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newData = this.productosRepo.create(body);
    return await this.productosRepo.save(newData);
  }

  //Actualiza un recurso
  async update(id: number, body: UpdateProductosDto): Promise<productosDto> {
    const result = await this.productosRepo.findOne(id);
    if (!result) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontrado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    this.productosRepo.merge(result, body);
    return await this.productosRepo.save(result);
  }

  //elimina un recurso
  async delete(id: number): Promise<boolean> {
    try {
      await this.productosRepo.delete(id);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
