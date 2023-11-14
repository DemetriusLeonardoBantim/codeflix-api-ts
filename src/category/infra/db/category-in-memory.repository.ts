import { Category } from "src/category/domain/category.entity";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { InMemoryRepository } from '../../../shared/infra/db/in-memory/in-memory.repository'
import { SortDirection } from "src/shared/domain/repository/search-params";


export class CategoryInMemoryRepository extends InMemoryRepository<Category, Uuid> {
  protected async applyFilter(items: Category[], filter: string): Promise<Category[]>{
    if(!filter) {
      return items
    }
  
    return items.filter((i) => {
      return (
        i.name.toLowerCase().includes(filter.toLowerCase())
      )
    })
  }

  getEntity(): new (...args: any[]) => any {
    return Category
  }

  protected async applySort(items: Category[], sort: string | null, sort_dir: SortDirection | null): Promise<Category[]> {
    return sort ? super.apllySort(items, sort, sort_dor) : super.applySort(items, "created_at", "desc")
  }
}