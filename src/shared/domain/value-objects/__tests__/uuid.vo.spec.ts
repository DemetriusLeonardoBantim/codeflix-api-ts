import { InvalidUuidError, Uuid } from "../uuid.vo"

describe('Uuid Unit Tests', () => {
  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new Uuid('invalid-uuid')
    }).toThrowError(new InvalidUuidError())
  })

  test("Should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid).toBeDefined();
    expect(uuid.id).toBeDefined()
  })

  test("Should accpect a valid uuid", () => {
    const uuid = new Uuid('550e8400-e29b-41d4-a716-446655440000')
    expect(uuid.id).toBe('550e8400-e29b-41d4-a716-446655440000')
  } )
 })