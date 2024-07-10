import { TypeOrmModuleOptions } from '@nestjs/typeorm';


/* We will define these creds in environment variables in production */

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'afuSystems2024',
  database: 'room_booking_api',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, 
};
