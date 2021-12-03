import { detalles } from '@modules/detalles/entities/detalles.entity';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'productos' })
export class productos {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_producto' })
  public id: number;

  @OneToMany(() => detalles, (detalles) => detalles.idProducto)
  public detalles: detalles[];

  @Index({ unique: true })
  @Column({ type: 'bigint', default: 0, nullable: false, name: 'dni' })
  public dni: number;

  @Column({ type: 'integer', default: 0, nullable: false, name: 'cantidad' })
  public cantidad: number;

  @Column({ type: 'bigint', default: 0, nullable: false, name: 'precio' })
  public precio: number;

  @Column({ type: 'varchar', length: 80, nullable: false, name: 'nombre' })
  public nombre: string;

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
