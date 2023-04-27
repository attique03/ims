import 'reflect-metadata';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Role } from './role/entities/role.entity';
import { RoleModule } from './role/role.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { Organization } from './organization/entities/organization.entity';
import { PasswordResetTokenModule } from './password-reset-token/password-reset-token.module';
import { PasswordResetToken } from './password-reset-token/entities/password-reset-token.entity';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { authMiddleware } from './utils/authMiddleware';
import { AssetsModule } from './assets/assets.module';
import { VendorModule } from './vendor/vendor.module';
import { Vendor } from './vendor/entities/vendor.entity';
import { Asset } from './assets/entities/asset.entity';
import { RequestsModule } from './requests/requests.module';
import { Requests } from './requests/entities/request.entity';
import { ComplaintsModule } from './complaints/complaints.module';
import { Complaint } from './complaints/entities/complaint.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from './upload/upload.module';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as express from 'express';
import { join } from 'path';

@Module({
  imports: [
    // MulterModule.register({
    //   dest: './uploads',
    // }),
    // MorganModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'attique',
      password: '1234',
      database: 'ims',
      entities: [
        Role,
        User,
        Organization,
        PasswordResetToken,
        Category,
        Vendor,
        Asset,
        Requests,
        Complaint,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    RoleModule,
    UserModule,
    OrganizationModule,
    PasswordResetTokenModule,
    CategoryModule,
    AssetsModule,
    VendorModule,
    RequestsModule,
    ComplaintsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MorganInterceptor('combined'),
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        authMiddleware /* express.static(join(process.cwd(), 'uploads')) */,
      )
      .exclude('user/login')
      .forRoutes(
        'user',
        'vendor',
        'assets',
        'requests',
        'complaints',
        'organization',
        'category',
        // { path: 'uploads', method: RequestMethod.POST },
      );
  }
}
