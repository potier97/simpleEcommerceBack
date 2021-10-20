import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {facturas} from '../../facturas/entities/facturas.entity';

@Entity()
export class clientes {
    @PrimaryGeneratedColumn()
    id_cliente: number;
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column()
    cedula: number;
    @Column({default: null})
    correo: string;
    @Column({default: null})
    telefono: number;

    @OneToMany(() => facturas, (facturas) => facturas.id_cliente )
    facturas: facturas[];
}