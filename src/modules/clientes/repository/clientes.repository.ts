import { clientes } from '../entities/clientes.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(clientes)
export class ClientesRepository extends Repository<clientes> {}
