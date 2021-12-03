import { ClientesRepository } from '@modules/clientes/repository/clientes.repository';
import { detalles } from '@modules/detalles/entities/detalles.entity';
import { DetallesRepository } from '@modules/detalles/repository/detalles.repository';
import { ModosPagosRepository } from '@modules/modos-pagos/repository/modos-pagos.repository';
import { UpdateProductosDto } from '@modules/productos/dtos/productos.dto';
import { productos } from '@modules/productos/entities/productos.entity';
import { ProductosRepository } from '@modules/productos/repository/productos.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesCompraDto, FacturasDto } from '../dtos/facturas.dto';
import { facturas } from '../entities/facturas.entity';
import { FacturasRepository } from '../repository/facturas.repository';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(FacturasRepository)
    private facturasRepository: FacturasRepository,
    @InjectRepository(ClientesRepository)
    private clientesRepository: ClientesRepository,
    @InjectRepository(ModosPagosRepository)
    private modosPagosRepository: ModosPagosRepository,
    @InjectRepository(ProductosRepository)
    private productosRepository: ProductosRepository,
    @InjectRepository(DetallesRepository)
    private detallesRepository: DetallesRepository,
  ) {}

  //Lista todos los revcursos
  async findAll(): Promise<facturas[]> {
    try {
      return await this.facturasRepository
        .createQueryBuilder('a')
        .where('a.estado = 1')
        .orderBy('a.id', 'ASC')
        .leftJoinAndSelect('a.idCliente', 'idCliente')
        .leftJoinAndSelect('a.idModoPago', 'idModoPago')
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
  async findOne(id: number): Promise<facturas> {
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
    const result = await this.facturasRepository.findOne(id, {
      relations: ['idCliente', 'idModoPago', 'detalles'],
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

  //Crea un recurso
  async create(body: FacturasDto): Promise<facturas> {
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
      const newData = this.facturasRepository.create(body);
      let totalCompra = 0;
      const productsToBuyList: any[] = [];
      const promises = body.details.map(async (product: DetallesCompraDto) => {
        if (product.cantidad > 0 && product.id > 0) {
          console.log('chao mundo -> ', product);
          const currentProduct = await this.productosRepository.findOne(
            product.id,
          );
          if (!currentProduct || currentProduct.estado !== 1) {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                message: 'Intento de compra de producto que no existe',
                content: false,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
          if (currentProduct.cantidad < product.cantidad) {
            throw new HttpException(
              {
                status: HttpStatus.BAD_REQUEST,
                message: `No hay STOCK para el producto  ${currentProduct.nombre}`,
                content: false,
              },
              HttpStatus.BAD_REQUEST,
            );
          }
          //Vamos sumando el costo actual de la compra
          totalCompra += currentProduct.precio * product.cantidad;
          console.log('totalCompra mundo -> ', totalCompra);
          //Armamos un objeto para obtener todos los datos del producto a comprar
          productsToBuyList.push(currentProduct);
          return {
            ...product,
          };
        }
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Productos no registrados correctamente',
            content: false,
          },
          HttpStatus.BAD_REQUEST,
        );
      });
      await Promise.all(promises);
      console.log('');
      console.log('==================================================');
      console.log('============ Lista de Productos de venta =========');
      console.log(productsToBuyList);
      // console.log(totalCompra);
      console.log('==================================================');
      console.log('==================================================');
      console.log('');

      // Validar que la tipo cliente exista
      if (body.cliente) {
        const idCliente = await this.clientesRepository.findOne(body.cliente);
        if (!idCliente || idCliente.estado !== 1) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              message: 'El cliente no existe',
              content: false,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        newData.idCliente = idCliente;
      }
      //Validar que el tipo de pago exista
      if (body.modoPago) {
        const idModoPago = await this.modosPagosRepository.findOne(
          body.modoPago,
        );
        if (!idModoPago || idModoPago.estado !== 1) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              message: 'El modo de pago no existe',
              content: false,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
        newData.idModoPago = idModoPago;
      }

      //Obtener el valor total
      newData.total = totalCompra;
      //Obtener el subtotal de la compra
      const subtotalCompra: number = Math.floor(totalCompra / 1.19);
      newData.subtotal = subtotalCompra;
      //Obtener  El Iva
      newData.iva = totalCompra - subtotalCompra;
      //Generar la fecha de la factura
      newData.fecha = new Date();
      //Generamos la factura actual
      const invoice = await this.facturasRepository.save(newData);

      console.log('');
      console.log('==================================================');
      console.log('============ Factura a ser registrada  ===========');
      console.log(newData);
      console.log('==================================================');
      console.log('==================================================');
      console.log('');
      //Actualizamos la lista del stock de los productos y generamos el detalle
      const promisesTwo = productsToBuyList.map(
        async (p: productos, index: number) => {
          //Cantidad de productos adquiridos por item o producto
          const quantityProduct: number = body.details[index].cantidad;
          //Registro de actualización del producto arquirido para disminuir el stock
          const newDataProduct: UpdateProductosDto = {
            cantidad: p.cantidad - quantityProduct,
          };
          this.productosRepository.merge(p, newDataProduct);
          const newUpdateData = await this.productosRepository.save(p);
          //Generar el detalle
          const detailBody: detalles = {
            cantidad: quantityProduct,
            estado: 1,
            idFactura: invoice,
            idProducto: newUpdateData,
            nombre: newUpdateData.nombre,
            precio: newUpdateData.precio,
            ActualizadoEn: new Date(),
            creadoEn: new Date(),
            id: 1,
          };
          const newDataDetails = this.detallesRepository.create(detailBody);
          console.log('Registro del detailBody');
          console.log(detailBody);
          console.log(newDataDetails);
          await this.detallesRepository.save(newDataDetails);
        },
      );

      await Promise.all(promisesTwo);

      return await this.facturasRepository.findOne(invoice.id, {
        relations: ['idCliente', 'idModoPago'],
      });
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
      const result = await this.facturasRepository.findOne(id);
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
      this.facturasRepository.merge(result, currentData);
      await this.facturasRepository.save(result);
      return true;
    } catch (e) {
      console.log('Error ', e);
      return false;
    }
  }
}
