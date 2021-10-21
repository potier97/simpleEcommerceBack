import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('productos')
export class ProductosController {
    @Get()
    getAll(){
        return [1,2,3,4]
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return id;
    }

    @Post()
    create(@Body() body: any){
        return body;
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: any){
        return body;
    }

    @Delete(':id')
    delete (@Param('id') id: number){
        return true
    }
}
