import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

describe('RoomController', () => {
  let controller: RoomController;
  let service: RoomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: RoomService,
          useValue: {
            findAllAvailable: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RoomController>(RoomController);
    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAllAvailable service method with correct parameters', async () => {
    const startDate = new Date();
    const endDate = new Date();
    const numberOfBeds = Math.floor(Math.random() * 5) + 1;
    await controller.findAvailableRooms({ startDate, endDate, numberOfBeds });
    expect(service.findAllAvailable).toHaveBeenCalledWith({ startDate, endDate }, numberOfBeds);
  });
});
