import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientesDto, UpdateClientesDto } from '../dtos/clientes.dto';
import { clientes } from '../entities/clientes.entity';
import { ClientesRepository } from '../repository/clientes.repository';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(ClientesRepository)
    private clientesRepository: ClientesRepository,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<clientes[]> {
    try {
      return await this.clientesRepository
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
  async findOne(id: number): Promise<clientes> {
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
    const result = await this.clientesRepository.findOne(id);
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
  async create(body: ClientesDto): Promise<clientes> {
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
    const newData = this.clientesRepository.create(body);
    return await this.clientesRepository.save(newData);
  }

  //Actualiza un recurso
  async update(id: number, body: UpdateClientesDto): Promise<clientes> {
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
    const result = await this.clientesRepository.findOne(id);
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
    this.clientesRepository.merge(result, body);
    return await this.clientesRepository.save(result);
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
      const result = await this.clientesRepository.findOne(id);
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
      this.clientesRepository.merge(result, currentData);
      await this.clientesRepository.save(result);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
