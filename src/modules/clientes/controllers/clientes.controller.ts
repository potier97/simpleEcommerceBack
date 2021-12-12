import { Controller, ParseIntPipe, Logger, UsePipes } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

//Importados
import { ClientesDto, UpdateClientesDto } from '../dtos/clientes.dto';
import { clientes } from '../entities/clientes.entity';
import {
  exampleTp,
  clientCreateTp,
  clientUpdateTp,
  clientDeleteTp,
  clientGetByIdTp,
  clientGetAllTp,
} from '@configdata/path';
import { ClientesService } from '../services/clientes.service';

@Controller('clientes')
export class ClientesController {
  private readonly logger = new Logger(ClientesController.name);

  constructor(private clientesService: ClientesService) {}

  @MessagePattern(exampleTp)
  async accumulate(data: number[]): Promise<number> {
    this.logger.log(`Procesando Mensaje de Ejemplo -> ${data}`);
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern(clientGetAllTp)
  async getAll(): Promise<clientes[]> {
    return this.clientesService.findAll();
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(clientGetByIdTp)
  async getOne(id: number): Promise<clientes> {
    return this.clientesService.findOne(id);
  }

  @MessagePattern(clientCreateTp)
  async create(body: ClientesDto): Promise<clientes> {
    return this.clientesService.create(body);
  }

  @MessagePattern(clientUpdateTp)
  async update(data: any): Promise<clientes> {
    const id: number = data.id;
    const body: UpdateClientesDto = data.body;
    return this.clientesService.update(id, body);
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern(clientDeleteTp)
  async delete(id: number): Promise<boolean> {
    return this.clientesService.delete(id);
  }
}
