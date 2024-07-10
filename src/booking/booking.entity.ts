import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  referenceId: string;
}
