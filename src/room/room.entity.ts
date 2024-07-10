import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  numberOfBeds: number;

  @Column()
  price: number;

  @Column('jsonb')
  availability: { date: Date; available: boolean }[];
}
