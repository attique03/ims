import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { In, Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    name: string,
    phone: string,
    subCategory: Category[],
    req,
  ): Promise<Vendor> {
    const vendor = new Vendor();
    vendor.name = name;

    console.log('Here => ', name, phone, subCategory);

    const subCategories = await this.categoryRepository.findBy({
      id: In(subCategory),
    });

    console.log('SubCategories', subCategory);
    vendor.subCategory = subCategories;

    const newVendor = this.vendorRepository.create({
      ...vendor,
      user: req.id,
      organization: req.organization.id,
    });

    return await this.vendorRepository.save(newVendor);
  }

  async findAll(req) {
    const vendors = await this.vendorRepository.find({
      relations: ['subCategory', 'subCategory.parent', 'organization'],
      where: {
        organization: req.user.organization.id,
      },
      order: {
        id: 'DESC',
      },
    });

    return vendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      phone: vendor.phone,
      categoryName: vendor?.subCategory[0]?.parent?.name
        ? vendor?.subCategory[0]?.parent?.name
        : null,
      subCategories: vendor.subCategory.map((subCategory) => subCategory.name),
    }));
  }

  async findOne(id: number, req) {
    const vendor = await this.vendorRepository.findOne({
      relations: ['subCategory', 'subCategory.parent', 'organization'],
      where: { id, organization: { id: req.user.organization.id } },
    });
    if (vendor) {
      return vendor;
    } else throw new NotFoundException('Vendor not found');
  }

  async remove(id: number) {
    const vendor = await this.vendorRepository.findOneBy({ id });
    if (!vendor) throw new NotFoundException('Vendor Not Found');
    return this.vendorRepository.remove(vendor);
  }

  async update(id: number, updateVendorDto: CreateVendorDto): Promise<Vendor> {
    const { name, phone, subCategory } = updateVendorDto;

    const vendor = await this.vendorRepository.findOne({
      relations: ['subCategory'],
      where: { id },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    vendor.name = name;
    vendor.phone = phone;

    const subCategories = await this.categoryRepository.findBy({
      id: In(subCategory),
    });
    vendor.subCategory = subCategories;

    return this.vendorRepository.save(vendor);
  }
}
