import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto, @Req() req) {
    return this.complaintsService.create(createComplaintDto, req);
  }

  @Get()
  findAll(@Req() req) {
    return this.complaintsService.findAll(req);
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: number) {
    return this.complaintsService.findOne(id, request);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateComplaintDto: CreateComplaintDto,
  ) {
    return this.complaintsService.update(id, updateComplaintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintsService.remove(+id);
  }
}
