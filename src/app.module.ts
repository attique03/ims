import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Role } from './role/entities/role.entity';
import { RoleController } from './role/role.controller';
import { RoleModule } from './role/role.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { Organization } from './organization/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'attique',
      password: '1234',
      database: 'ims',
      entities: [Role, User, Organization],
      synchronize: true,
    }),
    RoleModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
