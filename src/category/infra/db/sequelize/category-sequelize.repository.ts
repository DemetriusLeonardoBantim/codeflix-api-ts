import { Category } from 'src/category/domain/category.entity';
import { Entity } from 'src/shared/domain/entity';
import { SearchParams } from 'src/shared/domain/repository/search-params';
import { SearchResult } from 'src/shared/domain/repository/search-result';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from '../../../domain/category.repository'
import { CategoryModel } from './category.model';
import { NotFoundError } from 'src/shared/domain/errors/not-found.error';
import { where, Op } from 'sequelize';

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
  async update(entity: Category): Promise<void> {
    const id = entity.category_id.id
    const model = await this._get(entity.category_id.id)
    if(!model) {
      throw new NotFoundError(id, this.getEntity());
    }
    this.categoryModel.update({

      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.createdAt
    }, 
    {
      where: { category_id: entity.category_id.id },
    },
    )
  }

  async delete(category_id: Uuid): Promise<void> {
    const id = category_id.id
    const model = await this._get(id)
    if(!model) {
      throw new NotFoundError(id, this.getEntity())
    }
    await this.categoryModel.destroy({where: { category_id: id } })
  }

  async findById(entity_id: Uuid): Promise<Category> {
    const model = await this._get(entity_id.id)
    return new Category({
      category_id: new Uuid(model.category_id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.createdAt
    })
  }


  private async _get(id: string) {
    return await this.categoryModel.findByPk(id)
  }

  async findAll(): Promise<Category[]> {
    const models = await  this.categoryModel.findAll()
    return models.map((model) => {
      return new Category({
        category_id: new Uuid(model.category_id),
        name: model.name,
        description: model.description,
        is_active: model.is_active,
        created_at: model.createdAt
      })
    })
  }
  getEntity(): new (...args: any[]) => any {
    throw new Error('Method not implemented.');
  }

    
  async search(props: CategorySearchParams): Promise<SearchResult<Entity>> {
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
        return new Category({
          category_id: new Uuid(model.category_id),
          name: model.name,
          description: model.description,
          is_active: model.is_active,
          created_at: model.createdAt,
        })

      }),
      current_page: props.page,
      per_page: props.per_page
    })
  }
}