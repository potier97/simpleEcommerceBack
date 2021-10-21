import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { clientesDto, UpdateClientesDto } from '../dtos/clientes.dto';
import { clientes } from '../entities/clientes.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(clientes) private clienteRepo: Repository<clientes>,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<clientesDto[]> {
    return await this.clienteRepo.find();
  }

  //Encuentra un recurso por el id
  async findOne(id: number): Promise<clientesDto> {
    const result = await this.clienteRepo.findOne(id);
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
  async create(body: clientesDto): Promise<clientesDto> {
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
    const newData = this.clienteRepo.create(body);
    return await this.clienteRepo.save(newData);
  }

  //Actualiza un recurso
  async update(id: number, body: UpdateClientesDto): Promise<clientesDto> {
    const result = await this.clienteRepo.findOne(id);
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
    this.clienteRepo.merge(result, body);
    return await this.clienteRepo.save(result);
  }

  //elimina un recurso
  async delete(id: number): Promise<boolean> {
    try {
      await this.clienteRepo.delete(id);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
