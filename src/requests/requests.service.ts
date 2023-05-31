import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';
import {
  ADMIN,
  EMPLOYEE,
  PENDING,
  REJECTED,
  RESOLVED,
  SUPERADMIN,
} from 'src/constants/constants';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Requests } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private requestRepository: Repository<Requests>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  async create(requests: Requests, req): Promise<Requests> {
    console.log('Here ', requests);
    try {
      if (req.role.role === SUPERADMIN || req.role.role === ADMIN) {
        throw new ForbiddenException({
          error: 'Not allowed to create requests currently',
        });
      }
      const newRequest = this.requestRepository.create({
        ...requests,
        user: req.id,
        organization: { id: req.organization.id },
        returnType: ' ',
        status: PENDING,
      });

      return await this.requestRepository.save(newRequest);
    } catch (error) {
      throw new NotAcceptableException({ error });
    }
  }

  async findAll(req) {
    console.log();
    if (req.user.role.role === EMPLOYEE) {
      return this.requestRepository
        .createQueryBuilder('requests')
        .leftJoin('requests.subCategory', 'category')
        .leftJoin('category.parent', 'subcategory')
        .select([
          'requests.itemName',
          'requests.createdDate',
          'requests.type',
          'requests.status',
        ])
        .addSelect('requests.id', 'id')
        .addSelect('subcategory.name', 'categoryName')
        .addSelect('category.name', 'subcategoryName')
        .where('requests.organizationId = :organizationId', {
          organizationId: req.user.organization.id,
        })
        .andWhere('requests.userId = :userId', {
          userId: req.user.id,
        })
        .orderBy('requests', 'DESC')
        .getRawMany();
    } else if (req.user.role.role === ADMIN) {
      // ADMIN Fetches all the requets
      if (req.query.type === 'faulty') {
        return this.requestRepository
          .createQueryBuilder('requests')
          .leftJoin('requests.subCategory', 'category')
          .leftJoin('category.parent', 'subcategory')
          .leftJoin('requests.user', 'user')
          .select([
            'requests.itemName',
            'requests.createdDate',
            'requests.status',
            'requests.returnType',
          ])
          .addSelect('requests.id', 'id')
          .addSelect('subcategory.name', 'categoryName')
          .addSelect('category.name', 'subcategoryName')
          .addSelect('user.name', 'employee')
          .where('requests.organizationId = :organizationId', {
            organizationId: req.user.organization.id,
          })
          .andWhere('requests.type = :type', {
            type: req.query.type,
          })
          .orderBy('requests', 'DESC')
          .getRawMany();
      }
      // Requests of Individual Employee
      else if (req.query.userId) {
        console.log('Here ', req.query.userId);
        return (
          this.requestRepository
            .createQueryBuilder('requests')
            .leftJoin('requests.subCategory', 'category')
            .leftJoin('category.parent', 'subcategory')
            .leftJoin('requests.user', 'user')
            .select(['requests.itemName', 'requests.status'])
            .addSelect('requests.id', 'id')
            .addSelect('subcategory.name', 'categoryName')
            .addSelect('category.name', 'subcategoryName')
            // .addSelect('user.name', 'employee')
            .where('requests.organizationId = :organizationId', {
              organizationId: req.user.organization.id,
            })
            .andWhere('requests.userId = :userId', {
              userId: req.query.userId,
            })
            .orderBy('requests', 'DESC')
            .getRawMany()
        );
      } else {
        return this.requestRepository
          .createQueryBuilder('requests')
          .leftJoin('requests.subCategory', 'category')
          .leftJoin('category.parent', 'subcategory')
          .leftJoin('requests.user', 'user')
          .select([
            'requests.itemName',
            'requests.createdDate',
            'requests.status',
          ])
          .addSelect('requests.id', 'id')
          .addSelect('subcategory.name', 'categoryName')
          .addSelect('category.name', 'subcategoryName')
          .addSelect('user.name', 'employee')
          .where('requests.organizationId = :organizationId', {
            organizationId: req.user.organization.id,
          })
          .andWhere('requests.type = :type', {
            type: 'acquisition',
          })
          .orderBy('requests', 'DESC')
          .getRawMany();
      }
    } else {
      throw new ForbiddenException({
        error: 'Not Allowed into the requests ',
      });
    }
  }

  async findOne(id: number, request) {
    const rqst = await this.requestRepository
      .createQueryBuilder('requests')
      .leftJoinAndSelect('requests.user', 'user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('requests.organization', 'organization')
      .leftJoinAndSelect('requests.subCategory', 'category')
      .leftJoinAndSelect('category.parent', 'subcategory')
      .where('requests.id = :id', { id });

    if (request.user.role.role === ADMIN) {
      rqst.andWhere(
        'requests.organizationId = :organizationId AND user.roleId IN (:roleId)',
        {
          organizationId: request.user.organization.id,
          roleId: 3,
        },
      );
    } else if (request.user.role.role === EMPLOYEE) {
      rqst.andWhere('(requests.userId = :userId )', {
        userId: request.user.id,
      });
    } else {
      throw new ForbiddenException({
        error: 'Not Allowed to fetch a request',
      });
    }
    return rqst.getOne();
  }

  async update(id: number, req) {
    const requestResolved = await this.requestRepository.findOne({
      where: { id },
      relations: ['subCategory', 'user', 'organization'],
    });

    if (
      requestResolved &&
      requestResolved.type === 'acquisition' &&
      req.query.status === 'Resolved'
    ) {
      const asset = await this.assetRepository
        .createQueryBuilder('asset')
        .leftJoin('asset.subCategory', 'subCategory')
        .leftJoin('asset.employee', 'employee')
        .leftJoin('asset.organization', 'organization')
        .where('subCategory.id = :subCategoryId', {
          subCategoryId: requestResolved.subCategory.id,
        })
        .andWhere('employee.id IS NULL')
        // .andWhere('asset.organization = :organizationId', {
        //   organizationId: req.user.organization.id,
        // })
        .getRawOne();

      console.log('Request Above ', requestResolved, req.query.status);

      if (asset) {
        const assetId = asset.asset_id;
        const reqId = requestResolved.id;
        console.log('Request for Asset ', assetId, reqId);

        const updatedAsset = await this.assetRepository
          .createQueryBuilder()
          .update(Asset)
          .set({ employee: { id: requestResolved.user.id } })
          .where('id = :assetId', { assetId })
          .execute();

        const updatedRequest = await this.requestRepository
          .createQueryBuilder()
          .update(Requests)
          .set({ status: RESOLVED })
          .where('id = :reqId', { reqId })
          .execute();

        return { updatedRequest, updatedAsset };
      } else {
        throw new NotFoundException('No Asset Available at the moment');
      }
    } else if (requestResolved && req.query.status === 'Rejected') {
      const reqId = requestResolved.id;

      const updatedRequest = await this.requestRepository
        .createQueryBuilder()
        .update(Requests)
        .set({ status: REJECTED })
        .where('id = :reqId', { reqId })
        .execute();

      return updatedRequest;
    } else {
      throw new NotFoundException('Request not found');
    }

    // return;

    // if (req.query.status === 'Resolved' && assets.length > 0) {
    //   assets.map((asset, index) => {
    //     if (asset.employee !== null) {
    //     } else {
    //       throw new NotFoundException(
    //         'Inventory not available at the moment to be assigned',
    //       );
    //     }
    //   });
    // }
    // let asset = awa

    // if (!requestResolved) {
    //   throw new NotFoundException('Request Not Found');
    // } else {
    //   requestResolved = { ...requestResolved, status, returnType };
    //   return await this.requestRepository.save(requestResolved);
    // }
  }

  async remove(id: number) {
    const requests = await this.requestRepository.findOneBy({ id });

    if (!requests) {
      throw new NotFoundException('Request not found');
    }

    return await this.requestRepository.remove(requests);
  }
}
