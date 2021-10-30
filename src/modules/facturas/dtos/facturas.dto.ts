import { IsNotEmpty, IsNumber, IsPositive, IsDate } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class facturasDto {
  // @IsNumber()
  // @IsPositive()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'Cliente del la factura' })
  // public readonly cliente: number;

  // @IsArray()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'Listado de productos de detalle' })
  // public readonly detalle: number[];

  // @IsNumber()
  // @IsPositive()
  // @IsNotEmpty()
  // @ApiProperty({ description: 'Modo pago factura' })
  // public readonly modoPago: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Total de la compra' })
  public readonly total: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Subtotal de la compra' })
  public readonly subtotal: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Fecha de la compra' })
  public readonly fecha: Date;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Iva de la compra' })
  public readonly iva: number;
}

export class UpdateFacturasDto extends PartialType(facturasDto) {}

export class RegistrosDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Cliente del la factura' })
  public readonly cliente: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Modo pago factura' })
  public readonly modopago: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Total de la compra' })
  public readonly total: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Subtotal de la compra' })
  public readonly subtotal: number;
}
