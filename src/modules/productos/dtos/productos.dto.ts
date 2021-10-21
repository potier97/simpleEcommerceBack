import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class productosDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Dni del producto' })
  public readonly dni: number;

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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nombre del cliente' })
  public readonly nombre: string;
}

export class UpdateProductosDto extends PartialType(productosDto) {}
