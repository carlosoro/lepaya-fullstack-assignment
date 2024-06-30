import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fruit {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    fruityvice_id: number;
}