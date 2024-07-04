import { Fruit } from './../../fruits/fruit.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'ledgers'})
export class Ledger {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int4', nullable: false})
    fruit_id: number;

    @Column({ type: 'int4', nullable: false})
    location_id: number;

    @Column({ type: 'int4', nullable: true})
    amount: number;

    @Column({ type: 'timestamptz', nullable: false })
    time: string;

    @ManyToOne(() => Fruit, (fruit) => fruit.id, { eager: true })
    @JoinColumn({ name: 'fruit_id' })
    fruit: Fruit;
}