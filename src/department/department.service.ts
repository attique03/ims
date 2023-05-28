import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
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

  async findOne(id: number) {
    const department = await this.departmentRepository.findOneBy({ id });

    if (!department) throw new NotFoundException('Departmetn Not Found');
    return department;
  }

  async update(
    id: number,
    updateDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({
      id,
    });

    if (!department) {
      throw new NotFoundException('Deparment not found');
    }

    Object.assign(department, updateDepartmentDto);

    return this.departmentRepository.save(department);
  }

  async remove(id: number) {
    const department = await this.departmentRepository.findOne({
      relations: ['user'],
      where: { id },
    });

    department.user = null;

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    await this.departmentRepository.save(department);
    return await this.departmentRepository.remove(department);
  }
}
