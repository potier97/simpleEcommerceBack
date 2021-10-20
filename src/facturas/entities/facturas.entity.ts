import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import {clientes} from '../../clientes/entities/clientes.entity';

@Entity()
export class facturas {
    @PrimaryGeneratedColumn()
    id_factura:     number;
    // @Column()
    //id_cliente:     number;
    @Column()
    id_modo_pago:   number;
    @Column()
    total:          number;
    @Column()
    subtotal:       number;
    @Column()
    fecha:          string;
    @Column()
    iva:            number;
    @ManyToOne(() => clientes, (clientes) => clientes.facturas )
    @JoinColumn({name: 'id_cliente'})
    id_cliente:clientes;

}