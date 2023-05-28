import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull, In } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(category: Category, req): Promise<Category> {
    const newCategory = this.categoryRepository.create({
      name: category[0],
      organization: req.user.organization.id,
    });
    const createdCategory = await this.categoryRepository.save(newCategory);

    let newSubCategory;

    if (category) {
      category[1].map(async (cat) => {
        newSubCategory = this.categoryRepository.create({
          name: cat.value,
          parent: createdCategory,
          organization: req.user.organization.id,
        });
        await this.categoryRepository.save(newSubCategory);
      });
    }

    return createdCategory;
  }

  async findByIds(ids: number[]): Promise<Category[]> {
    return this.categoryRepository.findBy({ id: In(ids) });

    // return this.categoryRepository.findBy({ id: In([1, 2, 3]) });
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
      .leftJoinAndSelect('subcategory.vendor', 'vendor')
      .where('category.parent IS NULL')
      .select([
        'category.id',
        'category.name',
        'COUNT(DISTINCT subcategory.id) AS subcategories_count',
        'COUNT(DISTINCT vendor.id) FILTER (WHERE vendor.id IS NOT NULL) AS vendors_count',
      ])
      .groupBy('category.id')
      .getRawMany();

    return categories;
  }

  async getSubCategoriesByCategoryIdWithAssetQuantities(
    categoryId: number,
  ): Promise<any> {
    const queryBuilder = this.categoryRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.children', 's')
      .leftJoinAndSelect('s.vendor', 'v')
      .leftJoinAndSelect('s.asset', 'a')
      .leftJoinAndSelect(
        'requests',
        'r',
        'r.subCategoryId = s.id AND r.type = :type',
        { type: 'faulty' },
      )
      .where('c.id = :categoryId', { categoryId })
      .select([
        'c.id AS categoryId',
        'c.name AS categoryName',
        's.id AS subcategoryId',
        's.name AS subcategoryName',
        'v.name AS vendorName',
        'COUNT(a.id) AS totalQuantity',
        'COUNT(CASE WHEN a.employeeId IS NOT NULL THEN 1 END) AS quantityAssigned',
        'COUNT(CASE WHEN a.employeeId IS NULL THEN 1 END) AS quantityUnassigned',
        'COUNT(CASE WHEN r.type = :type THEN 1 END) AS faultyQuantity',
      ])
      .groupBy('c.id, c.name, s.id, s.name, v.name');

    const results = await queryBuilder.getRawMany();

    return results.map((result) => ({
      categoryId: result.categoryid,
      categoryName: result.categoryname,
      subcategoryId: result.subcategoryid,
      subcategoryName: result.subcategoryname,
      vendorName: result.vendorname,
      totalQuantity: parseInt(result.totalquantity),
      quantityAssigned: parseInt(result.quantityassigned),
      quantityUnassigned: parseInt(result.quantityunassigned),
      faultyQuantity: parseInt(result.faultyquantity),
    }));
  }

  async getSubCategoryInfo(subCategoryId: number): Promise<any> {
    const query = this.categoryRepository
      .createQueryBuilder('sub_categories')
      .leftJoin('sub_categories.parent', 'parent_categories')
      .leftJoin('sub_categories.vendor', 'vendor')
      .leftJoin('sub_categories.asset', 'asset')
      .leftJoin('sub_categories.requests', 'requests')
      .select([
        'parent_categories.name as categoryName',
        'sub_categories.name as subCategoryName',
        'COUNT(asset.id) as totalQuantity',
        'COUNT(CASE WHEN asset.employeeId IS NOT NULL THEN 1 END) as quantityAssigned',
        'COUNT(CASE WHEN asset.employeeId IS NULL THEN 1 END) as quantityUnassigned',
        'COUNT(CASE WHEN requests.type = :type THEN 1 END) as quantityFaulty',
        'COUNT(DISTINCT vendor.id) as totalVendors',
        "array_agg(vendor.name || ' (' || vendor.phone || ')') as vendorNames",
      ])
      .where('sub_categories.id = :id', { id: subCategoryId })
      .groupBy('parent_categories.name, sub_categories.name')
      .setParameter('type', 'faulty');

    const result = await query.getRawOne();
    return result;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} category`;
  // }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
