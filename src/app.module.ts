import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { UploadModule } from './upload/upload.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [
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
    DashboardModule,
    DepartmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // console.log('Type orm ', typeOrmConfig);
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .exclude('user/login', 'user/resetPassword')
      .forRoutes(
        'user',
        'vendor',
        'assets',
        'requests',
        'complaints',
        'organization',
        'category',
        'dashboard',
      );
  }
}
