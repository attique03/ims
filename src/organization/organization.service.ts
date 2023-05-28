import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Department } from 'src/department/entities/department.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,

    // Other Entities
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Complaint)
    private complaintRepository: Repository<Complaint>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Requests)
    private requestRepository: Repository<Requests>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
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

  async update(
    id: number,
    updateOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    Object.assign(organization, updateOrganizationDto);

    // organization.name = name || organization.name;
    // organization.email = email || organization.email;
    // organization.image = image || organization.image;
    // organization.bio = bio || organization.bio;
    // organization.address = address || organization.address;
    // organization.city = city || organization.city;
    // organization.country = country || organization.country;
    // organization.zip = zip || organization.zip;
    // organization.representativeName =
    //   representativeName || organization.representativeName;
    // organization.representativeContact =
    //   representativeContact || organization.representativeContact;

    // organization.name = name ? name : organization.name;
    // organization.email = email ? email : organization.email;
    // organization.image = image ? image : organization.image;
    // organization.bio = bio ? bio : organization.bio;
    // organization.address = address ? address : organization.address;
    // organization.city = city ? city : organization.city;
    // organization.country = country ? country : organization.country;
    // organization.zip = zip ? zip : organization.zip;
    // organization.representativeName = representativeName
    //   ? representativeName
    //   : organization.representativeName;
    // organization.representativeContact = representativeContact
    //   ? representativeContact
    //   : organization.representativeContact;

    return this.organizationRepository.save(organization);
  }

  async remove(id: number) {
    const organization = await this.organizationRepository.findOne({
      relations: [
        'user',
        'complaint',
        'asset',
        'vendor',
        'category',
        'requests',
        'department',
      ],
      where: { id },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    organization.user = null;
    organization.complaint = null;
    organization.asset = null;
    organization.vendor = null;
    organization.category = null;
    organization.requests = null;
    organization.department = null;

    // Delete the organization
    await this.organizationRepository.save(organization);
    return await this.organizationRepository.remove(organization);
  }
}
