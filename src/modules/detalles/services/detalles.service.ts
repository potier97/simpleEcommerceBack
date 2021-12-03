import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { detalles } from '../entities/detalles.entity';
import { DetallesRepository } from '../repository/detalles.repository';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(DetallesRepository)
    private detallesRepository: DetallesRepository,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<detalles[]> {
    try {
      return await this.detallesRepository
        .createQueryBuilder('a')
        .where('a.estado = 1')
        .orderBy('a.id', 'ASC')
        .leftJoinAndSelect('a.idProducto', 'idProducto')
        .leftJoinAndSelect('a.idFactura', 'idFactura')
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
  async findOne(id: number): Promise<detalles> {
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
    const result = await this.detallesRepository.findOne(id, {
      relations: ['idProducto', 'idFactura'],
    });
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

  //Actualiza un recurso
  // async update(id: number, body: updateDetallesDto): Promise<detalles> {
  //   if (id === null || id === undefined || id === 0) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'No proporcionó un id',
  //         content: false,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const result = await this.detallesRepository.findOne(id, {
  //     relations: ['idProducto', 'idFactura'],
  //   });
  //   if (!result || result.estado !== 1) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'No encontrado',
  //         content: false,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   if (body.estado !== 1) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         message: 'No modifique el estado del registro',
  //         content: false,
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   this.detallesRepository.merge(result, result);
  //   return await this.detallesRepository.save(result);
  // }

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
      const result = await this.detallesRepository.findOne(id);
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
      this.detallesRepository.merge(result, currentData);
      await this.detallesRepository.save(result);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
