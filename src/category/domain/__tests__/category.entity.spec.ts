import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
  test('Should create a category with default values', () => {
    const category = new Category({
      name: 'Movie',
      category_id: '123',
    })
    expect(category.category_id).toBe('123')
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)
  })

  test('Should create a category with all values', () => {
    const created_at = new Date()
    const category = new Category({
      name: 'Movie',
      category_id: '123',
      is_active: false,
      created_at,
      description: 'Description movie'
    })

  })
})