import { CategoryInMemoryRepository } from '../../../infra/db/in-memory/category-in-memory.repository'
import { CreateCategoryUseCase } from '../../create-category.use-case'

describe('', () => {
  let useCase: CreateCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new CreateCategoryUseCase(repository)
  })

  it('Should create a category', async () => {

  })
})