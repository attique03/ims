import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
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

  async findAll() {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .getRawMany();

    const cats = categories.filter((cat) => cat.category_parentId === null);
    const subCats = categories.filter((cat) => cat.category_parentId !== null);

    return [cats, subCats];
  }

  async getCategoriesWithSubcategoriesAndVendors() {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'subcategory')
      .leftJoinAndSelect('category.vendor', 'vendor')
      .where('category.parent IS NULL')
      .select([
        'category.id',
        'category.name',
        'COUNT(DISTINCT subcategory.id) AS subcategories_count',
        'COUNT(DISTINCT vendor.id) AS vendors_count',
      ])
      .groupBy('category.id')
      .getRawMany();

    return categories;
  }

  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // async findAll(): Promise<Category[]> {
  //   // const [categories, subcategories] = await Promise.all([
  //   //   this.categoryRepository.find({ where: { parent: null } }),
  //   //   this.categoryRepository.find({ where: { parent: Not(null) } }),
  //   // ]);

  //   // return [...categories, ...subcategories];
  //   return this.categoryRepository.find();
  // }

  // async function someFunction() {
  //   const result = await findAll();
  //   console.log('Categories:', result.categories);
  //   console.log('Subcategories:', result.subcategories);
  // }

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
