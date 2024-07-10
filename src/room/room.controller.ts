import { Controller, Get, Query } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAvailableRooms(@Query() query): Promise<Room[]> {
    const { startDate, endDate, numberOfBeds } = query;
    return this.roomService.findAllAvailable({ startDate, endDate }, numberOfBeds);
  }
}
