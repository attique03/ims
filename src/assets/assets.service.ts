import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(asset: Asset, req): Promise<Asset> {
    console.log('Asset ', asset);
    const { description, name, price, serial_number, subCategory, vendor } =
      asset;
    if (
      description &&
      name &&
      price &&
      serial_number &&
      subCategory &&
      vendor
    ) {
      const newAsset = this.assetRepository.create({
        ...asset,
        organization: req.user.organization.id,
      });

      return await this.assetRepository.save(newAsset);
    } else
      throw new NotAcceptableException('Please Fill all the required fields');
  }

  findAll(req) {
    if (req.query.employeeId) {
      return this.assetRepository
        .createQueryBuilder('asset')
        .leftJoin('asset.subCategory', 'category')
        .leftJoin('category.parent', 'subcategory')
        .select(['asset.name', 'asset.updatedDate'])
        .addSelect('asset.id', 'id')
        .addSelect('subcategory.name', 'categoryName')
        .addSelect('category.name', 'subcategoryName')
        .where('asset.organizationId = :organizationId', {
          organizationId: req.user.organization.id,
        })
        .andWhere('asset.employeeId = :employeeId', {
          employeeId: req.query.employeeId,
        })
        .orderBy('asset.id', 'DESC')
        .getRawMany();
    }
    return this.assetRepository
      .createQueryBuilder('asset')
      .leftJoin('asset.subCategory', 'category')
      .leftJoin('category.parent', 'subcategory')
      .select(['asset.name', 'asset.description', 'asset.price'])
      .addSelect('asset.id', 'id')
      .addSelect('subcategory.name', 'categoryName')
      .addSelect('category.name', 'subcategoryName')
      .where('asset.organizationId = :organizationId', {
        organizationId: req.user.organization.id,
      })
      .orderBy('asset.id', 'DESC')
      .getRawMany();
  }

  findOne(id: number, req) {
    console.log('findOne ', id);
    return this.assetRepository.findOne({
      where: { id, organization: { id: req.user.organization.id } },
      relations: ['subCategory', 'subCategory.parent', 'vendor', 'employee'],
    });
    // return (
    //   this.assetRepository
    //     .createQueryBuilder('asset')
    //     .leftJoinAndSelect('asset.subCategory', 'category')
    //     .leftJoinAndSelect('category.parent', 'subcategory')
    //     .leftJoin('asset.vendor', 'vendor')
    //     .leftJoin('asset.employee', 'employee')
    //     // .leftJoin('employee.user', 'user')
    //     .select([
    //       'asset.id',
    //       'category.name',
    //       'subcategory.name',
    //       'vendor.name',
    //       'vendor.phone',
    //       'employee.name',
    //       'employee.email',
    //       'employee.phone',
    //     ])
    //     .where('asset.id = :id', { id })
    //     .andWhere('asset.organizationId = :organizationId', {
    //       organizationId: 1,
    //     })
    //     .andWhere('asset.employeeId IS NOT NULL')
    //     .andWhere('employee.roleId = :roleId', { roleId: 3 })
    //     .getRawOne()
    // );
  }

  async update(id: number, updateAssetDto: CreateAssetDto): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { id },
    });

    // console.log('salkdj ', updateAssetDto);

    // if (updateAssetDto.employee) {
    //   const user = await this.userRepository.findOneBy({
    //     id: updateAssetDto.employee,
    //   });
    //   asset.employee = user;
    // }

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    Object.assign(asset, updateAssetDto);

    return this.assetRepository.save(asset);
  }

  async remove(id: number) {
    const asset = await this.assetRepository.findOneBy({
      id,
    });

    if (!asset) {
      throw new NotFoundException('Asset Not Found');
    }

    return await this.assetRepository.remove(asset);
  }
}
