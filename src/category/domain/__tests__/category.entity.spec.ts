import { EntityValidationError } from  '../../../shared/validators/validation.error'
import { Uuid } from '../../../shared/domain/value-objects/uuid.vo'
import { Category } from "../category.entity"


describe('Category Unit Tests', () => {
  let validateSpy: any
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate")
  })

  test('Should create a category with default values', () => {
    const category = new Category({
      name: 'Movie',
    })
    expect(category.category_id).toBeInstanceOf(Uuid)
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
  })

  test('Should create a category with all values', () => {
    const created_at = new Date()
    const category = new Category({
      name: 'Movie',
      is_active: false,
      created_at,
      description: 'Description movie'
    })
    expect(category.category_id).toBeInstanceOf(Uuid)
  })
})

describe('Category Validator', () => {
/*   describe('create command' , () => {
    new EntityValidationError({
      name: ["name is required"],
    })
    try {
      Category.create({
        name: ""
      })
    } catch(e) {
      console.log(e)
    }
  }) */
})