import { Ledger } from './../ledgers/entities/ledger.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'fruits'})
export class Fruit {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    fruityvice_id: number;

    @OneToMany(() => Ledger, (ledger) => ledger.fruit_id)
    @JoinColumn({ name: 'id' })
    ledgers: Ledger[];
}