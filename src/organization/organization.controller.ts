import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @SetMetadata('roles', 'superadmin')
  @UseGuards(RolesGuard)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @SetMetadata('roles', 'superadmin')
  @UseGuards(RolesGuard)
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @SetMetadata('roles', 'superadmin')
  @UseGuards(RolesGuard)
  findOne(@Param('id') id): Promise<Organization> {
    return this.organizationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationService.update(+id, updateOrganizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationService.remove(+id);
  }
}
