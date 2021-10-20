import { Injectable } from '@nestjs/common';
import {InjectRepository}from '@nestjs/typeorm';
import {Repository}from 'typeorm';
import {clientes} from '../entities/clientes.entity';

@Injectable()
export class ClientesService {

    constructor (
             @InjectRepository(clientes) private clienteRepo: Repository<clientes>   
    ){}
    findAll(){
        return this.clienteRepo.find();
    }
    findOne (id: number) {
        return this.clienteRepo.findOne(id);
    }

    create (body : any){
        const newCliente = this.clienteRepo.create(body);
        return this.clienteRepo.save(newCliente); 
    }
    async update (id: number, body: any){
        const cliente = await this.clienteRepo.findOne(id);
        this.clienteRepo.merge(cliente,body);
        return this.clienteRepo.save(cliente);
    }

    async delete (id: number){
        await this.clienteRepo.delete(id);
        return true;
    }

}
