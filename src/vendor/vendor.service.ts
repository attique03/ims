import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  async create(vendor: Vendor, req): Promise<Vendor> {
    const newVendor = this.vendorRepository.create({
      ...vendor,
      user: req.id,
    });

    return await this.vendorRepository.save(newVendor);
  }

  findAll(): Promise<Vendor[]> {
    return this.vendorRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} vendor`;
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return `This action updates a #${id} vendor`;
  }

  remove(id: number) {
    return `This action removes a #${id} vendor`;
  }
}
