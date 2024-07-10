import { Controller, Get, Query, Delete, Param, NotFoundException } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async findBookingsWithinDateRange(@Query() query): Promise<Booking[]> {
    const { startDate, endDate } = query;
    return this.bookingService.findAllWithinDateRange({ startDate, endDate });
  }

  @Delete(':id')
  async cancelBooking(@Param('id') id: string): Promise<void> {
    const booking = await this.bookingService.findOneById(+id);
    if (booking === null) { 
        throw new NotFoundException('Booking not found');
    }
    await this.bookingService.cancelBooking(id);
  }
}
