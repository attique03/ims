import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';
import { Repository } from 'typeorm';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Complaint)
    private readonly complaintRepository: Repository<Complaint>,
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  async getTotalOrganizations(): Promise<number> {
    const count = await this.organizationRepository.count();

    return count;
  }

  async getNewOrganizationsCount(): Promise<number> {
    const date = new Date();
    const currentMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const currentMonthEnd = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    );

    const organizations = await this.organizationRepository
      .createQueryBuilder('organization')
      .where('organization.createdDate >= :currentMonthStart', {
        currentMonthStart,
      })
      .andWhere('organization.createdDate <= :currentMonthEnd', {
        currentMonthEnd,
      })
      .getCount();

    return organizations;
  }

  async getTotalAdmins(): Promise<number> {
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where('user.roleId = :roleId', { roleId: 2 })
      .getCount();
    return count;
  }

  async getNewAdminsCount(): Promise<number> {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where('user.roleId = :roleId AND user.createdDate >= :startDate', {
        roleId: 2,
        startDate,
      })
      .getCount();
    return count;
  }

  async getPendingComplaints(): Promise<number> {
    const count = await this.complaintRepository.count({
      where: { status: 'Pending' },
    });
    return count;
  }

  async getPendingComplaintsCount(): Promise<number> {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const count = await this.complaintRepository
      .createQueryBuilder('comp')
      .where('comp.status = :status AND comp.createdDate >= :startDate', {
        status: 'Pending',
        startDate,
      })
      .getCount();
    return count;
  }

  async getResolvedComplaints(): Promise<number> {
    const count = await this.complaintRepository.count({
      where: { status: 'Resolved' },
    });
    return count;
  }

  async getResolvedComplaintsCount(): Promise<number> {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    const count = await this.complaintRepository
      .createQueryBuilder('comp')
      .where('comp.status = :status AND comp.createdDate >= :startDate', {
        status: 'Resolved',
        startDate,
      })
      .getCount();
    return count;
  }

  async getOrganizationsCountPerMonth() {
    const results = await this.organizationRepository
      .createQueryBuilder('org')
      .select(`to_char(org.createdDate, 'Month') AS month`)
      .addSelect(`EXTRACT(year FROM org.createdDate) AS year`)
      .addSelect(`COUNT(*) AS count`)
      .groupBy(`year, month`)
      .orderBy(`year, month`)
      .getRawMany();

    return results.map((result) => ({
      month: result.month,
      year: result.year,
      count: parseInt(result.count),
    }));
  }

  async getAdminsCountPerMonth() {
    const results = await this.userRepository
      .createQueryBuilder('users')
      .select(`to_char(users.createdDate, 'Month') AS month`)
      .addSelect(`EXTRACT(year FROM users.createdDate) AS year`)
      .addSelect(`COUNT(*) AS count`)
      .where('users.roleId = :roleId', { roleId: 2 })
      .groupBy(`year, month`)
      .orderBy(`year, month`)
      .getRawMany();

    return results;
  }

  // Admin Dashboard
  async getTotalEmployees(request): Promise<number> {
    console.log(request.user.organization);
    const count = await this.userRepository
      .createQueryBuilder('user')
      .select('COUNT(*) as count')
      .where(
        'user.roleId = :roleId AND user.organizationId = :organizationId',
        {
          roleId: 3,
          organizationId: request.user.organization.id,
        },
      )
      .getRawOne();

    return count.count;
  }

  async getNewEmployeesCount(request): Promise<number> {
    console.log(request.user.organization);
    const organizationId = request.user.organization.id;

    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const count = await this.userRepository
      .createQueryBuilder('user')
      .where(
        'user.roleId = :roleId AND user.createdDate >= :startDate AND user.organizationId = :organizationId',
        {
          roleId: 3,
          startDate,
          organizationId,
        },
      )
      .getCount();
    return count;
  }

  async getTotalAssets(request): Promise<number> {
    const count = await this.assetRepository
      .createQueryBuilder('asset')
      .select('COUNT(*) as count')
      .where('asset.organizationId = :organizationId', {
        organizationId: request.user.organization.id,
      })
      .getRawOne();

    return count.count;
  }

  async getNewAssetsCount(request): Promise<number> {
    const organizationId = request.user.organization.id;

    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );
    const count = await this.assetRepository
      .createQueryBuilder('asset')
      .where(
        'asset.createdDate >= :startDate AND asset.organizationId = :organizationId',
        {
          startDate,
          organizationId,
        },
      )
      .getCount();
    return count;
  }

  async getTotalVendors(request): Promise<number> {
    const count = await this.vendorRepository
      .createQueryBuilder('vendor')
      .select('COUNT(*) as count')
      .where('vendor.organizationId = :organizationId', {
        organizationId: request.user.organization.id,
      })
      .getRawOne();

    return count.count;
  }

  async getNewVendorsCount(request): Promise<number> {
    const organizationId = request.user.organization.id;

    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    const count = await this.vendorRepository
      .createQueryBuilder('vendor')
      .where(
        'vendor.createdDate >= :startDate AND vendor.organizationId = :organizationId',
        {
          startDate,
          organizationId,
        },
      )
      .getCount();
    return count;
  }

  async getTotalCategories(request): Promise<number> {
    const count = await this.categoryRepository
      .createQueryBuilder('category')
      .where(
        'category.parent IS NULL AND category.organizationId = :organizationId',
        {
          organizationId: request.user.organization.id,
        },
      )
      .getCount();
    return count;
  }

  async getNewCategoriesCount(request): Promise<number> {
    const organizationId = request.user.organization.id;

    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    );

    const count = await this.categoryRepository
      .createQueryBuilder('category')
      .where(
        'category.parent IS NULL AND category.createdDate >= :startDate AND category.organizationId = :organizationId',
        {
          startDate,
          organizationId,
        },
      )
      .getCount();
    return count;
  }

  async getAssetsCountByCategoryAndMonth() {
    const results = await this.assetRepository
      .createQueryBuilder('asset')
      .select(`to_char(asset.createdDate, 'Month') AS month`)
      // .select("date_trunc('month', asset.createdDate) AS month")
      .addSelect('category.name AS category')
      .addSelect(
        'COUNT(*) FILTER (WHERE asset.employeeId IS NOT NULL) AS assignedCount',
      )
      .addSelect(
        'COUNT(*) FILTER (WHERE asset.employeeId IS NULL) AS unassignedCount',
      )
      .innerJoin('asset.subCategory', 'subCategory')
      .innerJoin('subCategory.parent', 'category', 'category.parentId IS NULL')
      .groupBy('month, category.id')
      .getRawMany();

    return results;
  }

  async getComplaintsCountPerMonth() {
    const results = await this.complaintRepository
      .createQueryBuilder('complaints')
      // .select("date_trunc('month', complaints.createdDate) AS month")
      .select(`to_char(complaints.createdDate, 'Month') AS month`)
      .addSelect(
        "COUNT(*) FILTER (WHERE complaints.status = 'Pending') AS pendingCount",
      )
      .addSelect(
        "COUNT(*) FILTER (WHERE complaints.status = 'Resolved') AS resolvedCount",
      )
      .groupBy('month')
      .orderBy('month')
      .getRawMany();

    return results;
  }

  findAll() {
    return `This action returns all dashboardddd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
