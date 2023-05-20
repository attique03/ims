import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SUPERADMIN } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Requests } from './entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private requestRepository: Repository<Requests>,
  ) {}

  async create(requests: Requests, req): Promise<Requests> {
    try {
      if (req.role.role === SUPERADMIN) {
        throw new ForbiddenException({
          error: 'Super Admin is not allowed to create requests currently',
        });
      }
      const newRequest = this.requestRepository.create({
        ...requests,
        user: req.id,
      });

      return await this.requestRepository.save(newRequest);
    } catch (error) {
      throw new NotAcceptableException({ error });
    }
  }

  findAll() {
    return `This action returns all requests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} request`;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
