import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';

@Injectable()
export class BookingService {
  findOneById(arg0: number) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async findAllWithinDateRange(dateRange: { startDate: Date; endDate: Date }): Promise<Booking[]> {
    // Logic to find bookings within the specified date range
    return await this.bookingRepository.find(/* your query here */);
  }

  async cancelBooking(referenceId: string): Promise<void> {
    // Logic to cancel a booking by reference ID
    // Delete the booking from the database
  }
}
