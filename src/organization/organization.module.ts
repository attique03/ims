import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Department } from 'src/department/entities/department.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organization,
      Asset,
      Category,
      Complaint,
      Department,
      Requests,
      User,
      Vendor,
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [TypeOrmModule.forFeature([Organization])],
})
export class OrganizationModule {}
