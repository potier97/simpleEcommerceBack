import { facturas } from '@modules/facturas/entities/facturas.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'modos_pagos' })
export class modospagos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_modo_pago' })
  public id: number;

  @OneToMany(() => facturas, (facturas) => facturas.idModoPago)
  public facturas: facturas[];

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'tipo' })
  public tipo: string;

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
