import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  SetMetadata,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ADMIN } from 'src/constants/constants';
import { RolesGuard } from 'src/utils/roles.guard';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto, @Req() req) {
    return this.assetsService.create(createAssetDto, req);
  }

  @Get()
  @SetMetadata('roles', ADMIN)
  @UseGuards(RolesGuard)
  findAll(@Req() req) {
    return this.assetsService.findAll(req);
  }

  @Get(':id')
  @SetMetadata('roles', ADMIN)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: number, @Req() req) {
    return this.assetsService.findOne(id, req);
  }

  @Put(':id')
  @SetMetadata('roles', ADMIN)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateAssetDto: CreateAssetDto) {
    return this.assetsService.update(+id, updateAssetDto);
  }

  @Delete(':id')
  @SetMetadata('roles', ADMIN)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}
