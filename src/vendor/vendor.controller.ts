import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  create(
    @Body() createVendorDto: CreateVendorDto,
    // name: string,
    // phone: string,
    // subCategoryIds: number[],
    @Req() req,
  ) {
    const { name, phone, subCategory } = createVendorDto;
    return this.vendorService.create(name, phone, subCategory, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.vendorService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.vendorService.findOne(+id, req);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVendorDto: CreateVendorDto,
  ): Promise<Vendor> {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
