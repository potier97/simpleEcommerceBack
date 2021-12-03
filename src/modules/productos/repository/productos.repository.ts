import { productos } from '../entities/productos.entity';
import { EntityRepository, Repository } from 'typeorm';
// import { ShoppingsDto } from '@dtos/shoppings/shoppings.dto';

@EntityRepository(productos)
export class ProductosRepository extends Repository<productos> {}
