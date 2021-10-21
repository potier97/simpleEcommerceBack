import { facturas } from '@modules/facturas/entities/facturas.entity';
import { productos } from '@modules/productos/entities/productos.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { detallesDto, UpdateDetallesDto } from '../dtos/detalles.dto';
import { detalles } from '../entities/detalles.entity';

@Injectable()
export class DetallesService {
  constructor(
    @InjectRepository(detalles) private detalleRepo: Repository<detalles>,
    @InjectRepository(productos) private productosRepo: Repository<productos>,
    @InjectRepository(facturas) private facturasRepo: Repository<facturas>,
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

  //Crea un recurso
  async create(body: detallesDto): Promise<detallesDto> {
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
    const newData = this.detalleRepo.create(body);
    // //Validar que la tipo documento exista
    // if (payload.tipoDocumento) {
    //   const idTipoDocumento = await this.typeDocumentsRepository.findOne(
    //     payload.tipoDocumento,
    //   );
    //   newData.idTipoDocumento = idTipoDocumento;
    // }
    // //Validar que la lista de mascotas exista
    // if (payload.petsList) {
    //   const pets = await this.petsRepository.findByIds(payload.petsList);
    //   newData.pets = pets;
    // }

    // //Validar que el proveedor exista
    // if (body.) {
    //   const idProveedor = await this.productosRepo.findOne(
    //     body.proveedor,
    //   );
    //   newData.idProveedor = idProveedor;
    // }
    // const newShopping = await this.salesRepository.save(newData);
    // //Crear los detalles de la venta
    // if (body.details) {
    //   if (body.details.length > 0) {
    //     await this.createDetailsSales(body.details, newShopping);
    //   }
    // }
    // return newShopping;

    return await this.detalleRepo.save(newData);
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
