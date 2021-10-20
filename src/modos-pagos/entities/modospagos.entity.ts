import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class modospagos {
    @PrimaryGeneratedColumn()
    id_modo_pago: number;
    @Column()
    tipo: string;
}