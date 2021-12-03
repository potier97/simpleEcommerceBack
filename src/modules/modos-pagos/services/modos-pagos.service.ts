import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModosPagosDto, UpdatModosPagosDto } from '../dtos/modospagos.dto';
import { modospagos } from '../entities/modospagos.entity';
import { ModosPagosRepository } from '../repository/modos-pagos.repository';

@Injectable()
export class ModosPagosService {
  constructor(
    @InjectRepository(ModosPagosRepository)
    private modosPagosRepository: ModosPagosRepository,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<modospagos[]> {
    try {
      return await this.modosPagosRepository
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
  async findOne(id: number): Promise<modospagos> {
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
    const result = await this.modosPagosRepository.findOne(id);
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
  async create(body: ModosPagosDto): Promise<modospagos> {
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
    const newData = this.modosPagosRepository.create(body);
    return await this.modosPagosRepository.save(newData);
  }

  //Actualiza un recurso
  async update(id: number, body: UpdatModosPagosDto): Promise<modospagos> {
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
    const result = await this.modosPagosRepository.findOne(id);
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
    this.modosPagosRepository.merge(result, body);
    return await this.modosPagosRepository.save(result);
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
      const result = await this.modosPagosRepository.findOne(id);
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
      this.modosPagosRepository.merge(result, currentData);
      await this.modosPagosRepository.save(result);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
