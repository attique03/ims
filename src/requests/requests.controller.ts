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
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto, @Req() req) {
    return this.requestsService.create(createRequestDto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.requestsService.findAll(req);
  }

  @Get(':id')
  findOne(@Req() request, @Param('id') id: number) {
    return this.requestsService.findOne(id, request);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Req() req,
    // @Body() status: string,
    // @Body() returnType: string,
  ) {
    return this.requestsService.update(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(+id);
  }
}
