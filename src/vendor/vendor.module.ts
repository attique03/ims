import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { Vendor } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, Category])],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [TypeOrmModule.forFeature([Vendor])],
})
export class VendorModule {}
