import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'locations'})
export class Location {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: true})
    name: string;

    @Column({ type: 'varchar', nullable: true})
    headcount: number;

}