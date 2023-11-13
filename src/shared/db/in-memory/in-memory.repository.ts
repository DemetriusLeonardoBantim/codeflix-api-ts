import { IRepository } from '../../domain/repository/repository-interface'
import { Entity } from '../../domain/entity'
import { ValueObject } from '../../domain/value-object'
import { NotFoundError } from '../../domain/errors/not-found.error'

export  abstract class InMemoryRepository<E extends Entity, EntityId extends ValueObject > implements IRepository<E, EntityId>{
  items: E[] = []
  async insert(entity: E): Promise<void>{
    this.items.push(entity)
  }
  async bulkInsert(entities: any[]): Promise<void>{

  }

  async update(entity: E): Promise<void>{
    const indexFound = this.items.findIndex((item) => 
      item.entity_id.equals(entity.entity_id)
    )
    if(indexFound === -1) {
      throw new NotFoundError(entity.entity_id, this.getEntity())
    }
    this.items[indexFound] = entity
  }

  async delete(entity_id: EntityId): Promise<void> {
    const indexFound = this.items.find((item) => item.entity_id.equals(entity_id))
    if(indexFound === -1) {
      throw new NotFoundError(entity_id, this.getEntity())
    }
    this.items.splice(indexFound, 1)
  }

  async findById(entity_id: EntityId): Promise<E> {
    return this._get(entity_id)
  }

  async findAll(): Promise<any> {
    return this.items
  }

  protected async _get(entity_id: EntityId){
    const item = this.items.find((item) => item.entity_id.equals(entity_id))
    return typeof item === "undefined" ? null : item;
  }

  async getEntity(): new (...args: any[]) => any {
    return this.items
  } 
}