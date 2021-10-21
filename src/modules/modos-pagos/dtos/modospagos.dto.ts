import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class modosPagosDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Tipo de pago' })
  public readonly tipo: string;
}

export class UpdatModosPagosDto extends PartialType(modosPagosDto) {}
