import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { facturas } from '../../facturas/entities/facturas.entity';

@Entity({ name: 'clientes' })
export class clientes {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_cliente' })
  public id_cliente: number;

  @OneToMany(() => facturas, (facturas) => facturas.id_cliente)
  public facturas: facturas[];

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'nombre' })
  public nombre: string;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'apellido' })
  public apellido: string;

  @Column({
    type: 'integer',
    default: 0,
    unique: true,
    nullable: false,
    name: 'cedula',
  })
  public cedula: number;

  @Column({ type: 'varchar', default: 0, nullable: false, name: 'correo' })
  public correo: string;

  @Column({ type: 'integer', default: 0, nullable: false, name: 'telefono' })
  public telefono: number;

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
