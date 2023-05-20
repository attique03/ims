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
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetsService.create(createAssetDto);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(+id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(+id);
  }
}
