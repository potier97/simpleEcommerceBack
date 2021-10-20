import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import {ClientesService} from '../services/clientes.service';

@Controller('clientes')
export class ClientesController {

    constructor(
        private ClientesService: ClientesService
    ){}

    @Get()
    getAll(){
        return this.ClientesService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.ClientesService.findOne(id);
    }

    @Post()
    create(@Body() body: any){
        return this.ClientesService.create(body);;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any){
        return this.ClientesService.update(id,body);
    }

    @Delete(':id')
    delete (@Param('id') id: number){
        return this.ClientesService.delete(id);
    }

}
