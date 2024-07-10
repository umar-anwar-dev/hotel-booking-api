import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../booking/booking.entity';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAllAvailable(dateRange: { startDate: Date; endDate: Date }, numberOfBeds: number): Promise<Room[]> {
    const { startDate, endDate } = dateRange;

    // Query the database to find rooms available within the specified date range and with the specified number of beds
    const availableRooms = await this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.bookings', 'booking')
      .where('room.numberOfBeds >= :numberOfBeds', { numberOfBeds })
      .andWhere(':startDate NOT BETWEEN booking.startDate AND booking.endDate', { startDate })
      .andWhere(':endDate NOT BETWEEN booking.startDate AND booking.endDate', { endDate })
      .getMany();

    return availableRooms;
  }

  async bookRoom(roomId: number, bookingDetails: { startDate: Date; endDate: Date }): Promise<string> {
    // Find the room
    const room = await this.roomRepository.findOne({ where: { id: roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // Check if the room is available for the specified date range
    const isRoomAvailable = await this.isRoomAvailable(roomId, bookingDetails.startDate, bookingDetails.endDate);
    if (!isRoomAvailable) {
      throw new Error('Room is not available for the specified date range');
    }

    // Generate a booking reference ID
    const bookingReferenceId = Math.random().toString(36).substr(2, 9);

    // Create a new booking entity
    const newBooking = this.bookingRepository.create({
      roomId: room.id,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      referenceId: bookingReferenceId,
    });

    // Save the new booking to the database
    await this.bookingRepository.save(newBooking);

    // Return the generated booking reference ID
    return bookingReferenceId;
  }

  async isRoomAvailable(roomId: number, startDate: Date, endDate: Date): Promise<boolean> {
    const existingBooking = await this.bookingRepository.findOne({
      where: {
        roomId,
        startDate: startDate,
        endDate: endDate,
      },
    });

    return !existingBooking;
  }
}
