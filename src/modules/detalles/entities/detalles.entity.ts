import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { facturas } from '../../facturas/entities/facturas.entity';
import { productos } from '@modules/productos/entities/productos.entity';

@Entity({ name: 'detalles' })
export class detalles {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_detalle' })
  public id: number;

  @ManyToOne(() => facturas, (facturas) => facturas.detalles)
  @JoinColumn({ name: 'id_factura' })
  public idFactura: facturas;

  @ManyToOne(() => productos, (productos) => productos.detalles)
  @JoinColumn({ name: 'id_producto' })
  public idProducto: productos;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'nombre' })
  public nombre: string;

  @Column({ type: 'integer', default: 0, nullable: false, name: 'cantidad' })
  public cantidad: number;

  @Column({ type: 'integer', default: 0, nullable: false, name: 'precio' })
  public precio: number;

  @Column({ type: 'integer', default: 1, nullable: false, name: 'estado' })
  public estado: number;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_at',
    nullable: false,
  })
  public creadoEn: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
    nullable: false,
  })
  public ActualizadoEn: Date;
}
