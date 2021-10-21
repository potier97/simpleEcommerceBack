import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class detallesDto {
  // @IsNumber()
  // @IsPositive()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'Factura del cliente' })
  // public readonly factura: number;

  // @IsNumber()
  // @IsPositive()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'producto del cliente' })
  // public readonly producto: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del producto' })
  public readonly nombre: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'cantidad del producto' })
  public readonly cantidad: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'precio del producto' })
  public readonly precio: number;
}

export class UpdateDetallesDto extends PartialType(detallesDto) {}
