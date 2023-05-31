import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseArrayPipe,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, req);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/individual/:id')
  findOne(@Req() request, @Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Get('/all')
  getCategoriesWithSubcategoriesAndVendors() {
    return this.categoryService.getCategoriesWithSubcategoriesAndVendors();
  }

  @Get('/all/:id')
  getSubCategoriesByCategoryIdWithAssetQuantities(@Param('id') categoryId) {
    return this.categoryService.getSubCategoriesByCategoryIdWithAssetQuantities(
      categoryId,
    );
  }

  @Get('/all/subcategory/:id')
  getSubCategoryInfo(@Param('id') subCategoryId) {
    return this.categoryService.getSubCategoryInfo(subCategoryId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  @Get(':ids')
  async findByIds(
    @Param('ids', ParseArrayPipe) ids: number[],
  ): Promise<Category[]> {
    return this.categoryService.findByIds(ids);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Put(':id/add')
  addSubcategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
    @Req() req,
  ) {
    return this.categoryService.addSubcategory(+id, updateCategoryDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @Delete('/subcategory/:id')
  removeSubcategory(@Param('id') id: string) {
    return this.categoryService.removeSubcategory(+id);
  }
}
