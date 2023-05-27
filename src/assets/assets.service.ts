import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
  ) {}

  async create(asset: Asset): Promise<Asset> {
    const newAsset = this.assetRepository.create(asset);

    return await this.assetRepository.save(newAsset);
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
      .getRawMany();
  }

  findOne(id: number, req) {
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

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
