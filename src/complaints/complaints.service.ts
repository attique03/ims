import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { Complaint } from './entities/complaint.entity';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectRepository(Complaint)
    private complaintRepository: Repository<Complaint>,
  ) {}

  async create(complaint: CreateComplaintDto, req): Promise<Complaint> {
    try {
      if (req.user.role.id === 1) {
        throw new ForbiddenException({
          error: 'Super Admin is not allowed to create compliants currently',
        });
      }
      const newComplaint = this.complaintRepository.create({
        ...complaint,
        status: 'Pending',
        user: req.user.id,
        organization: req.user.organization.id,
      });

      return await this.complaintRepository.save(newComplaint);
    } catch (error) {
      throw new NotAcceptableException({ error });
    }
  }

  async findAll(req) {
    // Super Admin fetches all the complaints from Admins
    if (req.user.role.id === 1) {
      return await this.complaintRepository
        .createQueryBuilder('complaint')
        .select([
          'complaint.description',
          'complaint.createdDate',
          'complaint.status',
        ])
        .addSelect('complaint.id', 'id')

        .addSelect('organization.name', 'organization')
        .leftJoin('complaint.organization', 'organization')

        .addSelect('user.name', 'user')
        .leftJoin('complaint.user', 'user')
        .andWhere('user.roleId = :roleId', {
          roleId: 2,
          // roleId: req?.user.role.id === 1 ? 2 : req?.user.role.id === 2 ? 3 : 0,
        })
        .getRawMany();
    }
    // Admin fetches all the complaints from Employee and his own complaints as well
    else if (req.user.role.id === 2) {
      if (req.query.employees) {
        console.log('Employees ==>  ', req.user.organization);
        return await this.complaintRepository
          .createQueryBuilder('complaint')
          .select([
            'complaint.description',
            'complaint.createdDate',
            'complaint.status',
          ])
          .addSelect('complaint.id', 'id')

          .leftJoin('complaint.organization', 'organization')
          .where('complaint.organizationId = :organizationId', {
            organizationId: req?.user?.organization?.id,
          })

          .addSelect('user.name', 'user')
          .leftJoin('complaint.user', 'user')
          .andWhere('user.roleId = :roleId', {
            roleId: 3,
          })
          .getRawMany();
      }
      return await this.complaintRepository
        .createQueryBuilder('complaint')
        .select([
          'complaint.description',
          'complaint.createdDate',
          'complaint.status',
        ])
        .addSelect('complaint.id', 'id')
        // .leftJoin('complaint.user', 'user')
        .where('complaint.userId = :userId', {
          userId: req.user.id,
        })
        .getRawMany();
    }
    // Employee Fetches his own complaints
    else if (req.user.role.id === 3) {
      return await this.complaintRepository
        .createQueryBuilder('complaint')
        .select([
          'complaint.title',
          'complaint.description',
          'complaint.createdDate',
          'complaint.status',
        ])
        .addSelect('complaint.id', 'id')
        .where('complaint.userId = :userId', {
          userId: req.user.id,
        })
        .getRawMany();
    }
    throw new ForbiddenException('Not Authozied');
  }

  async findOne(id: number, request) {
    try {
      return this.complaintRepository
        .createQueryBuilder('complaint')
        .where('complaint.id = :id AND complaint.userId = :userId', {
          id,
          userId: request.user.id,
        })
        .getOne();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateComplaintDto: CreateComplaintDto) {
    let complaintResolved = await this.complaintRepository.findOneBy({ id });
    console.log('Inside Update ', complaintResolved, id);

    if (!complaintResolved) {
      throw new NotFoundException('Complaint Not Found');
    } else {
      complaintResolved = { ...complaintResolved, status: 'Resolved' };
      return await this.complaintRepository.save(complaintResolved);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} complaint`;
  }
}
