import { clientes } from '@modules/clientes/entities/clientes.entity';
import { modospagos } from '@modules/modos-pagos/entities/modospagos.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Transaction } from 'typeorm';
import { facturasDto, RegistrosDto } from '../dtos/facturas.dto';
import { facturas } from '../entities/facturas.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(facturas) private facturasRepo: Repository<facturas>,
    @InjectRepository(clientes) private clientesRepo: Repository<clientes>,
    @InjectRepository(modospagos)
    private modospagosRepo: Repository<modospagos>,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<facturasDto[]> {
    return await this.facturasRepo.find({
      relations: ['id_cliente', 'id_modo_pago'],
    });
  }

  //Encuentra un recurso por el id
  async findOne(id: number): Promise<facturasDto> {
    const result = await this.facturasRepo.findOne(id, {
      relations: ['id_cliente', 'id_modo_pago'],
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

  //Crea un recurso
  async create(body: RegistrosDto): Promise<any> {
    try {
      if (body === null || body === undefined) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'No proporcionó datos',
            content: false,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      const newData = this.facturasRepo.create(body);
      newData.iva = body.total - body.subtotal;
      newData.fecha = new Date();
      // Validar que la tipo cliente exista
      if (body.cliente) {
        const id_cliente = await this.clientesRepo.findOne(body.cliente);
        newData.id_cliente = id_cliente;
      }
      //Validar que el tipo de pago exista
      if (body.modopago) {
        const id_modo_pago = await this.modospagosRepo.findOne(body.modopago);
        newData.id_modo_pago = id_modo_pago;
      }
      return await this.facturasRepo.save(newData);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          message: 'Error interno',
          content: false,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  //elimina un recurso
  async delete(id: number): Promise<boolean> {
    try {
      await this.facturasRepo.delete(id);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
