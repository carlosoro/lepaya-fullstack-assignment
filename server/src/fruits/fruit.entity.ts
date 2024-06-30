import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fruit {
    @Column()
    id: number;

    @Column()
    name: string;

    @Column()
    fruityvice_id: number;
}