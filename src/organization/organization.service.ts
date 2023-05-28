import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(organization: Organization): Promise<Organization> {
    const {
      name,
      email,
      image,
      bio,
      address,
      city,
      country,
      zip,
      representativeName,
      representativeContact,
    } = organization;

    if (
      name &&
      email &&
      image &&
      bio &&
      address &&
      city &&
      country &&
      zip &&
      representativeName &&
      representativeContact
    ) {
      const newOrganization = this.organizationRepository.create(organization);
      return await this.organizationRepository.save(newOrganization);
    } else throw new NotAcceptableException('All Fields are required');
  }

  async findAll() {
    const organizations = await this.organizationRepository.find({
      order: { id: 'DESC' },
    });

    return organizations.map((organization) => {
      return {
        id: organization.id,
        image: organization.image,
        name: organization.name,
        location: organization.city.concat(', ', organization.country),
        email: organization.email,
        contact: organization.representativeContact,
      };
    });
    // return await this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    const item = await this.organizationRepository.findOneBy({ id });

    if (!item) throw new NotFoundException('Organization Not Found');
    return item;
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
