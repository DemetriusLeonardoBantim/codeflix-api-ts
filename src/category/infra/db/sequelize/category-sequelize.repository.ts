import { Category } from 'src/category/domain/category.entity';
import { Entity } from 'src/shared/domain/entity';
import { SearchParams } from 'src/shared/domain/repository/search-params';
import { SearchResult } from 'src/shared/domain/repository/search-result';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { ICategoryRepository } from '../../../domain/category.repository'

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'created_at'];

  insert(entity: Category): Promise<void> {
    throw new Error('Method not implemented.');
  }
  dulkInsert(entities: Category[]): Promise<void> {
    throw new Error('Method not implemented.');
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