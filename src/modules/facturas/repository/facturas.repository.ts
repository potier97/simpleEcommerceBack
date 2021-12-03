import { facturas } from '../entities/facturas.entity';
import { EntityRepository, Repository } from 'typeorm';
// import { ShoppingsDto } from '@dtos/shoppings/shoppings.dto';

@EntityRepository(facturas)
export class FacturasRepository extends Repository<facturas> {}
