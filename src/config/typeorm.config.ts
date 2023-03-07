import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'attique',
  password: '1234',
  database: 'postgres',
  autoLoadEntities: true,
  synchronize: true,
};
