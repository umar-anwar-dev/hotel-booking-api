import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { typeOrmConfig } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RoomModule,
    BookingModule,
  ],
})
export class AppModule {}
