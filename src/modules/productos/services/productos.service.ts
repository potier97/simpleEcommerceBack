import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosDto, UpdateProductosDto } from '../dtos/productos.dto';
import { productos } from '../entities/productos.entity';
import { ProductosRepository } from '../repository/productos.repository';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ProductosRepository)
    private productosRepository: ProductosRepository,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<productos[]> {
    try {
      return await this.productosRepository
        .createQueryBuilder('a')
        .where('a.estado = 1')
        .orderBy('a.id', 'ASC')
        .getMany();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Error al obtener los recursos',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //Encuentra un recurso por el id
  async findOne(id: number): Promise<productos> {
    if (id === null || id === undefined || id === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No proporcionó un id',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.productosRepository.findOne(id);
    if (!result || result.estado !== 1) {
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
  async create(body: ProductosDto): Promise<productos> {
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
    const newData = this.productosRepository.create(body);
    return await this.productosRepository.save(newData);
  }

  //Actualiza un recurso
  async update(id: number, body: UpdateProductosDto): Promise<productos> {
    if (id === null || id === undefined || id === 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No proporcionó un id',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.productosRepository.findOne(id);
    if (!result || result.estado !== 1) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No encontrado',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (body.estado !== 1) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'No modifique el estado del registro',
          content: false,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    this.productosRepository.merge(result, body);
    return await this.productosRepository.save(result);
  }

  //Elimina un recurso de manera logica
  async delete(id: number): Promise<boolean> {
    try {
      if (id === 0 || id === null || id === undefined) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'No proporciono un id',
            content: false,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const result = await this.productosRepository.findOne(id);
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
      const currentData = result;
      currentData.estado = 0;
      this.productosRepository.merge(result, currentData);
      await this.productosRepository.save(result);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
