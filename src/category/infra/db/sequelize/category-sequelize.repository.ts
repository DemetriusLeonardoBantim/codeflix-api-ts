import { Category } from 'src/category/domain/category.entity';
import { Entity } from 'src/shared/domain/entity';
import { SearchParams } from 'src/shared/domain/repository/search-params';
import { SearchResult } from 'src/shared/domain/repository/search-result';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { ICategoryRepository } from '../../../domain/category.repository'
import { CategoryModel } from './category.model';

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'created_at'];

  constructor(private categoryModel: typeof CategoryModel) {

  }

  async insert(entity: Category): Promise<void> { 
    await this.categoryModel.create({
      category_id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at
    })
  }
  async dulkInsert(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(
      entities.map((entity) => ({
          category_id: entity.category_id.id,
          name: entity.name,
          description: entity.description,
          is_active: entity.is_active,
          created_at: entity.created_at
      }))
    )
  }
  update(entity: Category[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(entity_id: Uuid): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(entity_id: Uuid): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  getEntity(): new (...args: any[]) => any {
    throw new Error('Method not implemented.');
  }

    
  search(props: SearchParams<string>): Promise<SearchResult<Entity>> {
    throw new Error('Method not implemented.');
  }
}