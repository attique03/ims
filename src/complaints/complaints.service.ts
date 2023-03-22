import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
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

  async create(complaint: Complaint, req): Promise<Complaint> {
    console.log('in service ');
    try {
      if (req.role.id === 1) {
        throw new ForbiddenException({
          error: 'Super Admin is not allowed to create compliants currently',
        });
      }
      // const newRequest = this.complaintRepository.create({
      //   ...complaint,
      //   user: req.id,
      // });

      return complaint;

      // return await this.complaintRepository.save(newRequest);
    } catch (error) {
      throw new NotAcceptableException({ error });
    }
  }

  findAll() {
    return `This action returns all complaints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complaint`;
  }

  update(id: number, updateComplaintDto: UpdateComplaintDto) {
    return `This action updates a #${id} complaint`;
  }

  remove(id: number) {
    return `This action removes a #${id} complaint`;
  }
}
