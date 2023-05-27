import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EMPLOYEE, SUPERADMIN } from 'src/constants/constants';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(department: CreateDepartmentDto, req): Promise<Department> {
    try {
      if (
        req.user.role.role === SUPERADMIN ||
        req.user.role.role === EMPLOYEE
      ) {
        throw new ForbiddenException({
          error: 'Not allowed to create Departments currently',
        });
      }
      const newDepartment = this.departmentRepository.create({
        ...department,

        organization: req.user.organization.id,
      });

      return await this.departmentRepository.save(newDepartment);
    } catch (error) {
      throw new NotAcceptableException('Error Creating Department ' + error);
    }
  }

  async findAll() {
    return await this.departmentRepository.find({
      relations: ['organization'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
