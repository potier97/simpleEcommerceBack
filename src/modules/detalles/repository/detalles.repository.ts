import { detalles } from '../entities/detalles.entity';
import { EntityRepository, Repository } from 'typeorm';
// import { ShoppingsDto } from '@dtos/shoppings/shoppings.dto';

@EntityRepository(detalles)
export class DetallesRepository extends Repository<detalles> {}
