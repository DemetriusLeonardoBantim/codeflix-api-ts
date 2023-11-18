import { Entity } from "../entity"
import { ValueObject } from '../value-object'
import { SearchParams } from "./search-params"
import { SearchResult } from "./search-result"


export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>
  dulkInsert(entities: E[]): Promise<void>
  update(entity: E): Promise<void>;
  delete(entity_id: EntityId): Promise<void>;

  findById(entity_id: EntityId): Promise<E>
  findAll(): Promise<E[]>

  getEntity(): new (...args: any[]) => any
}


export interface ISeartchableRepository<
  E extends Entity, 
  EntityId extends ValueObject, 
  Filter = string,
  SearchInput = SearchParams<Filter>, 
  SearchOutput = SearchResult
> extends IRepository<E, EntityId> {
  sortableFields: string[]
  search(props: SearchInput): Promise<SearchOutput>

}