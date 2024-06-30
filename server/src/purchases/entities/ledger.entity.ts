import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ledger {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    fruit_id: number;

    @Column()
    location_id: number;

    @Column()
    amount: number;

    @Column()
    time: string;
}