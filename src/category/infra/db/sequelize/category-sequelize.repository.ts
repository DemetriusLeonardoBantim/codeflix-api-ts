import { Category } from 'src/category/domain/category.entity';
import { Entity } from 'src/shared/domain/entity';
import { SearchParams } from 'src/shared/domain/repository/search-params';
import { SearchResult } from 'src/shared/domain/repository/search-result';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from '../../../domain/category.repository'
import { CategoryModel } from './category.model';
import { NotFoundError } from 'src/shared/domain/errors/not-found.error';
import { where, Op } from 'sequelize';
import { CategoryModelMapper } from './category-mapper';

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
    const modelProp = entities.map((entity) => CategoryModelMapper.toModel(entity))
    await this.categoryModel.bulkCreate(modelProp)
  }
  async update(entity: Category): Promise<void> {
    const id = entity.category_id.id
    const modelProp = await this._get(entity.category_id.id)
    if(!modelProp) {
      throw new NotFoundError(id, this.getEntity());
    }
    this.categoryModel.update({

      name: modelProp.name,
      description: modelProp.description,
      is_active: modelProp.is_active,
      created_at: modelProp.createdAt
    }, 
    {
      where: { category_id: entity.category_id.id },
    },
    )
  }

  async delete(category_id: Uuid): Promise<void> {
    const id = category_id.id
    const modelProp = await this._get(id)
    if(!modelProp) {
      throw new NotFoundError(id, this.getEntity())
    }
    await this.categoryModel.destroy({where: { category_id: id } })
  }

  async findById(entity_id: Uuid): Promise<Category | null> {
    const modelProp = await this._get(entity_id.id)

    return modelProp ? CategoryModelMapper.toEntity(modelProp) : null 

  }


  private async _get(id: string) {
    return await this.categoryModel.findByPk(id)
  }

  async findAll(): Promise<Category[]> {
    const modelProp = await  this.categoryModel.findAll()
    return modelProp.map((model) => {
      return CategoryModelMapper.toEntity(model)
    })
  }
  getEntity(): new (...args: any[]) => any {
    throw new Error('Method not implemented.');
  }

    
  async search(props: CategorySearchParams): Promise<SearchResult> {
    const offset = (props.page - 1) * props.per_page
    const limit = props.per_page

    const {rows: models, count} =  await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}` }
        }
      }),
      ...(props.sort && this.sortableFields.includes(props.sort) ? 
      { order: [[props.sort, props.sort_dir]] } : 
      { order: [["created_at", "desc"]] }),
      offset,
      limit
    })
    return new CategorySearchResult({
      items: models.map((model) => {
        return CategoryModelMapper.toEntity(model)
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: 0
    })
  }
}