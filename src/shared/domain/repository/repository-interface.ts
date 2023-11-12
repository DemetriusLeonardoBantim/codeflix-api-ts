import { Entity } from "../domain/entity"

export interface IRepository extends Entity {
  insert(entity): Promise<void>
  update(entity): Promise<void>
  delete(entity_id): Promise<void>
  findById(entity_id): Promise<any>
  findAll(): Promise<any>

  getEntity(): new (...args: any[]) => any
}