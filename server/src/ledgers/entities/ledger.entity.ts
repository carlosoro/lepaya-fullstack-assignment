import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}