import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { detallesDto, UpdateDetallesDto } from '../dtos/detalles.dto';
import { detalles } from '../entities/detalles.entity';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(detalles) private detalleRepo: Repository<detalles>,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<detallesDto[]> {
    return await this.detalleRepo.find({
      relations: ['id_factura', 'id_producto'],
    });
  }

  //Encuentra un recurso por el id
  async findOne(id: number): Promise<detallesDto> {
    const result = await this.detalleRepo.findOne(id, {
      relations: ['id_factura', 'id_producto'],
    });
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

  //Actualiza un recurso
  async update(id: number, body: UpdateDetallesDto): Promise<detallesDto> {
    const result = await this.detalleRepo.findOne(id, {
      relations: ['id_factura', 'id_producto'],
    });
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
    this.detalleRepo.merge(result, body);
    return await this.detalleRepo.save(result);
  }

  //elimina un recurso
  async delete(id: number): Promise<boolean> {
    try {
      await this.detalleRepo.delete(id);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
