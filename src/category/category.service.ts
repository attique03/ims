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

    // const categories = await this.categoryRepository
    //   .createQueryBuilder('category')
    //   .leftJoinAndSelect('category.children', 'subcategory')
    //   .leftJoinAndSelect('category.vendor', 'vendor')
    //   .where('category.parent IS NULL')
    //   .select([
    //     'category.id',
    //     'category.name',
    //     'COUNT(DISTINCT subcategory.id) AS subcategories_count',
    //     'COUNT(DISTINCT vendor.id) AS vendors_count',
    //   ])
    //   .groupBy('category.id')
    //   .getRawMany();

    // return categories;
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
    console.log('Here ==>', subCategoryId);
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

    // const query = this.categoryRepository
    //   .createQueryBuilder('sub_categories')
    //   .leftJoin('sub_categories.parent', 'parent_categories')
    //   .leftJoin('sub_categories.vendor', 'vendor')
    //   .leftJoin('sub_categories.asset', 'asset')
    //   .leftJoin('sub_categories.requests', 'requests')
    //   .select([
    //     'parent_categories.name as categoryName',
    //     'sub_categories.name as subCategoryName',
    //     'COUNT(asset.id) as totalQuantity',
    //     'COUNT(CASE WHEN asset.employeeId IS NOT NULL THEN 1 END) as quantityAssigned',
    //     'COUNT(CASE WHEN asset.employeeId IS NULL THEN 1 END) as quantityUnassigned',
    //     'COUNT(CASE WHEN requests.type = $1 THEN 1 END) as quantityFaulty',
    //     'COUNT(DISTINCT vendor.id) as totalVendors',
    //     "array_agg(vendor.name || ' (' || vendor.contact_number || ')') as vendorNames",
    //   ])
    //   .where('sub_categories.id = $1', [subCategoryId])
    //   .groupBy('parent_categories.name, sub_categories.name');

    // const result = await query.getRawOne();
    // return result;

    // const query = this.categoryRepository
    //   .createQueryBuilder('sub_categories')
    //   .leftJoin('sub_categories.parent', 'parent_categories')
    //   .leftJoin('sub_categories.vendor', 'vendor')
    //   .leftJoin('sub_categories.asset', 'asset')
    //   .leftJoin('sub_categories.requests', 'requests')
    //   .select([
    //     'parent_categories.name as categoryName',
    //     'sub_categories.name as subCategoryName',
    //     'COUNT(asset.id) as totalQuantity',
    //     'COUNT(CASE WHEN asset.employeeId IS NOT NULL THEN 1 END) as quantityAssigned',
    //     'COUNT(CASE WHEN asset.employeeId IS NULL THEN 1 END) as quantityUnassigned',
    //     'COUNT(CASE WHEN requests.type = :type THEN 1 END) as quantityFaulty',
    //     'COUNT(DISTINCT vendor.id) as totalVendors',
    //     "array_agg(vendor.name || ' (' || vendor.contact_number || ')') as vendorNames",
    //   ])
    //   .where('sub_categories.id = :subCategoryId', { subCategoryId })
    //   .groupBy('parent_categories.name, sub_categories.name');

    // const result = await query.getRawMany();

    // return result.map((item) => ({
    //   categoryName: item.categoryName,
    //   subCategoryName: item.subCategoryName,
    //   totalQuantity: Number(item.totalQuantity),
    //   quantityAssigned: Number(item.quantityAssigned),
    //   quantityUnassigned: Number(item.quantityUnassigned),
    //   quantityFaulty: Number(item.quantityFaulty),
    //   totalVendors: Number(item.totalVendors),
    //   vendorNames: item.vendorNames,
    // }));

    // const query = this.categoryRepository
    //   .createQueryBuilder('sub_categories')
    //   .leftJoin('sub_categories.parent', 'parent_categories')
    //   .leftJoin('sub_categories.vendors', 'vendors')
    //   .leftJoin('sub_categories.assets', 'assets')
    //   .leftJoin('sub_categories.requests', 'requests')
    //   .select([
    //     'parent_categories.name as categoryName',
    //     'sub_categories.name as subCategoryName',
    //     'COUNT(assets.id) as totalQuantity',
    //     'COUNT(CASE WHEN assets.userId IS NOT NULL THEN 1 END) as quantityAssigned',
    //     'COUNT(CASE WHEN assets.userId IS NULL THEN 1 END) as quantityUnassigned',
    //     'COUNT(CASE WHEN requests.type = :requestType THEN 1 END) as quantityFaulty',
    //     'COUNT(DISTINCT vendors.id) as totalVendors',
    //     "array_agg(vendors.name || ' (' || vendors.contact_number || ')') as vendorNames",
    //   ])
    //   .where('sub_categories.id = :subCategoryId', { subCategoryId })
    //   .groupBy(['parent_categories.name', 'sub_categories.name']);
    // return query.getRawMany();

    // const queryBuilder = this.categoryRepository
    //   .createQueryBuilder('s')
    //   .leftJoinAndSelect('s.vendor', 'v')
    //   .leftJoinAndSelect('s.asset', 'a')
    //   .leftJoinAndSelect(
    //     'requests',
    //     'r',
    //     'r.subCategoryId = s.id AND r.type = :type',
    //     { type: 'faulty' },
    //   )
    //   .where('s.id = :subcategoryId', { subcategoryId })
    //   .select([
    //     's.name AS subcategoryName',
    //     'c.name AS categoryName',
    //     'COUNT(a.id) AS totalQuantity',
    //     'COUNT(CASE WHEN a.employeeId IS NOT NULL THEN 1 END) AS quantityAssigned',
    //     'COUNT(CASE WHEN a.employeeId IS NULL THEN 1 END) AS quantityUnassigned',
    //     'COUNT(CASE WHEN r.type = :type THEN 1 END) AS faultyQuantity',
    //     'COUNT(DISTINCT v.id) AS totalVendors',
    //     'GROUP_CONCAT(DISTINCT CONCAT_WS(" ", v.name, v.contactNumber)) AS vendorInfo',
    //   ])
    //   .leftJoin('s.category', 'c')
    //   .groupBy('s.id, c.name')
    //   .addGroupBy('s.name');
    // const results = await queryBuilder.getRawOne();
    // return {
    //   subcategoryName: results.subcategoryName,
    //   categoryName: results.categoryName,
    //   totalQuantity: parseInt(results.totalQuantity),
    //   quantityAssigned: parseInt(results.quantityAssigned),
    //   quantityUnassigned: parseInt(results.quantityUnassigned),
    //   faultyQuantity: parseInt(results.faultyQuantity),
    //   totalVendors: parseInt(results.totalVendors),
    //   vendorInfo: results.vendorInfo,
    // };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
