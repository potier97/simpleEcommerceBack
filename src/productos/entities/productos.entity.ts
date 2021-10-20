import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class productos {
    @PrimaryGeneratedColumn()
    id_producto: number;
    @Column()
    dni: number;
    @Column()
    cantidad: number;
    @Column()
    precio: number;
    @Column({default: null})
    nombre: string;
}