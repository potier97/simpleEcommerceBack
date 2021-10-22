import { detalles } from '@modules/detalles/entities/detalles.entity';
import { modospagos } from '@modules/modos-pagos/entities/modospagos.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { clientes } from '../../clientes/entities/clientes.entity';

@Entity({ name: 'facturas' })
export class facturas {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_factura' })
  public id_factura: number;

  @OneToMany(() => detalles, (detalles) => detalles.id_factura)
  public detalles: detalles[];

  @ManyToOne(() => clientes, (clientes) => clientes.facturas)
  @JoinColumn({ name: 'id_cliente' })
  public id_cliente: clientes;

  @ManyToOne(() => modospagos, (modospagos) => modospagos.facturas)
  @JoinColumn({ name: 'id_modo_pago' })
  public id_modo_pago: modospagos;

  @Column({ type: 'integer', default: 0, nullable: false, name: 'total' })
  public total: number;

  @Column({ type: 'integer', default: 0, nullable: false, name: 'subtotal' })
  public subtotal: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    name: 'fecha',
  })
  public fecha: Date;

  @Column({ type: 'integer', default: 0, nullable: false, name: 'iva' })
  public iva: number;

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
