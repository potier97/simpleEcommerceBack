import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { modosPagosDto, UpdatModosPagosDto } from '../dtos/modospagos.dto';
import { modospagos } from '../entities/modospagos.entity';

@Injectable()
export class ModosPagosService {
  constructor(
    @InjectRepository(modospagos)
    private modosPagosRepo: Repository<modospagos>,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<modosPagosDto[]> {
    return await this.modosPagosRepo.find();
  }

  //Encuentra un recurso por el id
  async findOne(id: number): Promise<modosPagosDto> {
    const result = await this.modosPagosRepo.findOne(id);
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
  async create(body: modosPagosDto): Promise<modosPagosDto> {
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
    const newData = this.modosPagosRepo.create(body);
    return await this.modosPagosRepo.save(newData);
  }

  //Actualiza un recurso
  async update(id: number, body: UpdatModosPagosDto): Promise<modosPagosDto> {
    const result = await this.modosPagosRepo.findOne(id);
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
    this.modosPagosRepo.merge(result, body);
    return await this.modosPagosRepo.save(result);
  }

  //elimina un recurso
  async delete(id: number): Promise<boolean> {
    try {
      await this.modosPagosRepo.delete(id);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
