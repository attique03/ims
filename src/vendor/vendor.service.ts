import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
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
    vendor.phone = phone;

    console.log('Here => ', name, phone, subCategory[0]);

    const subCategories = await this.categoryRepository.findBy({
      id: In(subCategory),
    });

    if (subCategories.length === 0) {
      throw new NotAcceptableException(
        'Please select at least one sub-category',
      );
    }

    console.log('SubCategories', subCategory);
    vendor.subCategory = subCategories;

    const newVendor = this.vendorRepository.create({
      ...vendor,
      user: req.id,
      organization: req.organization.id,
    });

    // return newVendor;

    return await this.vendorRepository.save(newVendor);
  }

  async findAll(req) {
    const vendors = await this.vendorRepository.find({
      relations: ['subCategory', 'subCategory.parent', 'organization'],
      where: {
        organization: { id: req.user.organization.id },
      },
      order: {
        id: 'DESC',
      },
    });

    // const vendors = await this.vendorRepository
    //   .createQueryBuilder('vendor')
    //   .leftJoinAndSelect('vendor.subCategory', 'subCategory')
    //   .leftJoinAndSelect('subCategory.parent', 'parent')
    //   .leftJoinAndSelect('vendor.organization', 'organization')
    //   .where('organization.id = :organizationId', {
    //     organizationId: req.user.organization.id,
    //   })
    //   .andWhere('subCategory IS NOT NULL')
    //   .orderBy('vendor.id', 'DESC')
    //   .getRawMany();

    const vends = vendors.map((vendor) => ({
      id: vendor.id,
      name: vendor.name,
      phone: vendor.phone,
      categoryName:
        vendor &&
        vendor.subCategory.length > 0 &&
        vendor?.subCategory[0]?.parent?.name
          ? vendor?.subCategory[0]?.parent?.name
          : null,
      subCategories:
        vendor && vendor.subCategory.length > 0
          ? vendor.subCategory.map((subCategory) => subCategory.name + ', ')
          : null,
    }));

    const filteredVendors = vends.filter(
      (vend) => vend.categoryName && vend.subCategories,
    );

    return filteredVendors;
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
    const vendor = await this.vendorRepository.findOne({
      relations: ['subCategory', 'asset'],
      where: { id },
    });

    if (!vendor) throw new NotFoundException('Vendor Not Found');

    vendor.subCategory = null;
    vendor.asset = null;

    await this.vendorRepository.save(vendor);
    return this.vendorRepository.remove(vendor);
  }

  async update(id: number, updateVendorDto: CreateVendorDto): Promise<Vendor> {
    console.log('Here ');
    const { name, phone } = updateVendorDto;

    const vendor = await this.vendorRepository.findOne({
      relations: ['subCategory'],
      where: { id },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    vendor.name = name;
    vendor.phone = phone;

    // if (subCategory) {
    //   const subCategories = await this.categoryRepository.findBy({
    //     id: In(subCategory),
    //   });
    //   if (subCategories.length > 0) {
    //     vendor.subCategory = subCategories;
    //   }
    // }

    return this.vendorRepository.save(vendor);
  }
}
