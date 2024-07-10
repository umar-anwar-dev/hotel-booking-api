import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

describe('BookingController', () => {
  let controller: BookingController;
  let service: BookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: {
            findAllWithinDateRange: jest.fn(),
            cancelBooking: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BookingController>(BookingController);
    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAllWithinDateRange service method with correct parameters', async () => {
    const startDate = new Date();
    const endDate = new Date();
    await controller.findBookingsWithinDateRange({ startDate, endDate });
    expect(service.findAllWithinDateRange).toHaveBeenCalledWith({ startDate, endDate });
  });

  it('should call cancelBooking service method with correct ID', async () => {
    const id = Math.floor(Math.random() * 1000).toString(); 
    await controller.cancelBooking(id);
    expect(service.cancelBooking).toHaveBeenCalledWith(+id);
  });
});
