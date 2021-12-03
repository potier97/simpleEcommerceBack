import { modospagos } from '../entities/modospagos.entity';
import { EntityRepository, Repository } from 'typeorm';
// import { ShoppingsDto } from '@dtos/shoppings/shoppings.dto';

@EntityRepository(modospagos)
export class ModosPagosRepository extends Repository<modospagos> {}
