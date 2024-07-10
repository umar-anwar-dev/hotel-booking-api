import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room } from './room.entity'; 
import { Booking } from '../booking/booking.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Booking]), 
  ],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
