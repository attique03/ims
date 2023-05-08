import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RolesGuard } from 'src/utils/roles.guard';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('superadmin')
  @SetMetadata('roles', 'superadmin')
  @UseGuards(RolesGuard)
  async getSuperAdminDashboardData() {
    const totalOrganizations =
      await this.dashboardService.getTotalOrganizations();
    const totalAdmins = await this.dashboardService.getTotalAdmins();
    const pendingComplaints =
      await this.dashboardService.getPendingComplaints();
    const resolvedComplaints =
      await this.dashboardService.getResolvedComplaints();
    const newOrganizationsCount =
      await this.dashboardService.getNewOrganizationsCount();
    const pendingComplaintsCount =
      await this.dashboardService.getPendingComplaintsCount();
    const resolvedComplaintsCount =
      await this.dashboardService.getResolvedComplaintsCount();
    const newAdminsCount = await this.dashboardService.getNewAdminsCount();

    return {
      totalOrganizations,
      totalAdmins,
      pendingComplaints,
      resolvedComplaints,
      newOrganizationsCount,
      pendingComplaintsCount,
      resolvedComplaintsCount,
      newAdminsCount,
    };
  }

  @Get('/superadmin/stats')
  @SetMetadata('roles', 'superadmin')
  @UseGuards(RolesGuard)
  async getSuperAdminDashboardStats() {
    const orgCountsPerMonth =
      await this.dashboardService.getOrganizationsCountPerMonth();
    const adminCountsPerMonth =
      await this.dashboardService.getAdminsCountPerMonth();

    return { orgCountsPerMonth, adminCountsPerMonth };
  }

  @Get('/admin')
  @SetMetadata('roles', 'admin')
  @UseGuards(RolesGuard)
  async getAdminDashboardData(@Req() request) {
    const totalEmployees = await this.dashboardService.getTotalEmployees(
      request,
    );
    const newEmployeesCount = await this.dashboardService.getNewEmployeesCount(
      request,
    );
    const totalAssets = await this.dashboardService.getTotalAssets(request);
    const newAssetsCount = await this.dashboardService.getNewAssetsCount(
      request,
    );
    const totalVendors = await this.dashboardService.getTotalVendors(request);
    const newVendorsCount = await this.dashboardService.getNewVendorsCount(
      request,
    );
    const totalCategories = await this.dashboardService.getTotalCategories(
      request,
    );
    const newCategoriesCount =
      await this.dashboardService.getNewCategoriesCount(request);

    return {
      totalEmployees,
      newEmployeesCount,
      totalAssets,
      newAssetsCount,
      totalVendors,
      newVendorsCount,
      totalCategories,
      newCategoriesCount,
    };
  }

  @Get('/admin/stats')
  @SetMetadata('roles', 'admin')
  @UseGuards(RolesGuard)
  async getAdminDashboardStats() {
    const assetCountsByCategoryAndMonth =
      await this.dashboardService.getAssetsCountByCategoryAndMonth();
    const complaintsCountPerMonth =
      await this.dashboardService.getComplaintsCountPerMonth();

    return { assetCountsByCategoryAndMonth, complaintsCountPerMonth };
  }

  @Post()
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }

  @Get()
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDashboardDto: UpdateDashboardDto,
  ) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
