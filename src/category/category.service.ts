import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: Category): Promise<Category> {
    const newCategory = this.categoryRepository.create({ name: category[0] });
    const createdCategory = await this.categoryRepository.save(newCategory);

    let newSubCategory, createdSubCategory;

    if (category) {
      category[1].map(async (cat) => {
        newSubCategory = this.categoryRepository.create({
          name: cat.value,
          parent: createdCategory,
        });
        createdSubCategory = await this.categoryRepository.save(newSubCategory);
      });
    }

    return createdCategory;
  }

  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returnss a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
